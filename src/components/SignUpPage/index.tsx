import axios from "axios";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageRouteArray, PageRoutes } from "../../router";
import { getUserByEmail, postUser, updateUser } from "../../services/users";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetAll } from "../../store/newUser/newUserSlice";
import { selectEmail, selectPassword } from "../../store/newUser/selectors";
import { selectIsValid } from "../../store/signUpPages/selectors";
import {
  selectUserFirstName,
  selectUserId,
  selectUserLastName,
} from "../../store/user/selectors";
import { setSignUpComplete, setUserId } from "../../store/user/userSlice";
import { NewUser } from "../../types/services";
import BreadcrumbTrail from "../common/BreadcrumbTrail";
import "./styles.css";

// Used for Breadcrumb component - readable titles
export const formTitles: Array<string> = [
  "Sign Up - Guidance",
  "Username",
  "Secure your account",
  "Full Name",
];

const SignUpPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [, setUserCreated] = useState(false);
  const [success, setSuccess] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const userId = useAppSelector(selectUserId);
  const firstname: string = useAppSelector(selectUserFirstName);
  const surname: string = useAppSelector(selectUserLastName);

  // Used to trigger the modal appearance if user needs to
  // complete the sign up procedure to continue.
  const [redirectModalIsOpen, setRedirectModalIsOpen] = useState(false);

  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
    buttonText: "Ok",
  });
  // Calculate the current page from the URL section
  const pathname = useLocation().pathname;
  const currentPath = pathname.replace("/sign-up/", "");
  let pageNum: number = PageRouteArray.findIndex(
    (route) => route === currentPath
  );

  if (pageNum < 0) {
    // TODO: Throw error here.
    pageNum = 0;
  }

  const [nextButtonText, setNextButtonText] = useState<string>("Next");
  // Store the current page by it's name - so we can control
  // the text on the 'Next' button and what happens when page is complete
  const pageRoute: string = PageRouteArray[pageNum];
  // Need to know if we are at the last page for the 'Next' button to change
  const lastPage: string = PageRouteArray[PageRouteArray.length - 1];
  // Get isValid status for subpage from Redux.
  const pageIsValid = useAppSelector(selectIsValid(PageRouteArray[pageNum]));

  // Subscribe to newUser information from Redux
  const newUser: NewUser = {
    email: useAppSelector(selectEmail),
    password: useAppSelector(selectPassword),
  };

  // User can 'Save and Continue' once username and password complete
  // The last page should be 'Submit'
  useEffect(() => {
    setErrorMessage("");
    switch (pageRoute) {
      case PageRoutes.SignUpPage:
        setNextButtonText("Next");
        break;
      case PageRoutes.UsernamePage:
        setNextButtonText(userId < 0 ? "Next" : "Log in and continue");
        break;
      case PageRoutes.PasswordPage:
        setNextButtonText(
          userId < 0 ? "Save and Continue" : "Log in and continue"
        );
        break;
      case lastPage: // At present, this is - PageRoutes.FullNamePage:
        setNextButtonText("Submit");
        break;
      default:
        setNextButtonText("Next");
    }
  }, [pageRoute, lastPage, userId]);

  useEffect(() => {
    // Before we draw any modals, bind the modal to the app
    Modal.setAppElement("#root");
  });

  // When Previous button is clicked, return 1 page.
  const onPrevious = () => {
    navigate(-1);
  };

  const storeUserData = (user: {
    email: string;
    id: number;
    signUpComplete: boolean;
  }) => {
    dispatch(setUserId(user.id));
    dispatch(setSignUpComplete(user.signUpComplete));
  };

  // Handle next button click for all sub pages
  // TODO: split these into separate funcs.
  const onNext = async () => {
    setSuccess(false);

    // Before we navigate away, determine the page and complete any
    // necessary actions.

    if (pageRoute === PageRoutes.SignUpPage) {
      setSuccess(true);
    }
    if (pageRoute === PageRoutes.UsernamePage && pageIsValid) {
      // If username page, check if user already exists.
      try {
        const response = await getUserByEmail(newUser.email);
        console.log(
          `SignUpPage - getUserByEmail, email: ${
            newUser.email
          } response: ${JSON.stringify(response)}`
        );
        if (response[0]) {
          const jsonUser = JSON.parse(JSON.stringify(response[0]));
          setSuccess(true);
          // User exists
          if (jsonUser.email === newUser.email) {
            console.log(`User exists - emails match`);
            // If user has a complete sign up, redirect them to log in
            if (jsonUser.signUpComplete) {
              setModalData({
                title: "Welcome Back!",
                message: `It looks like you are already fully signed up! We will direct you so you can log in.`,
                buttonText: "Take Me There!",
              });
              setRedirectModalIsOpen(true);
              return;
            }
            // Following pages need to understand that user already exists.
            // And has an incomplete sign up - as not redirected to log in.
            storeUserData(jsonUser);
          }
        }
      } catch (err) {
        setSuccess(false);
        errorRef.current?.focus();
        console.log("SignUpPage - Error with getUserByEmail call");
        if (axios.isAxiosError(err)) {
          console.log(err.toJSON());
          if (!err.response) {
            setErrorMessage("Existing user check failed - No server response");
          } else if (err.response?.status === 400) {
            setErrorMessage(`Existing user check failed - user does not exist`);
          } else if (err.response?.status !== 200) {
            setErrorMessage(
              `Status not equal to 200. Status = ${err.response?.status}`
            );
          } else {
            setErrorMessage("Login failed");
          }
        } else {
          console.log(err);
          setErrorMessage("Login failed - ");
        }
      }
    }

    // If not an existing user who needs to complete their sign up
    // at this point we need to save as new user.
    if (pageRoute === PageRoutes.PasswordPage && pageIsValid && userId < 0) {
      try {
        const response = await postUser(newUser);
        const jsonUser = JSON.parse(JSON.stringify(response)).user;
        console.log(
          `SignUpPage onNext - jsonData = ${JSON.stringify(jsonUser)}`
        );
        // TODO: improve this message:
        setModalData({
          title: "Your Details have been saved",
          message: `You are now free to continue the sign up procedure or return at a later date to complete. 
                    To continue at a later date, please revisit the sign up form and enter your email and password`,
          buttonText: "Ok",
        });
        setInfoModalIsOpen(true);
        // alert(`Your details have been saved.
        // You are free to either continue or return and complete at a later date.
        // To continue at a later date, please revisit the sign up form and enter your email and password`);

        storeUserData(jsonUser);
        setSuccess(true);
        setUserCreated(true);
      } catch (err) {
        setSuccess(false);
        errorRef.current?.focus();
        console.log(`Error with postUser call, success var = ${success}`);
        if (axios.isAxiosError(err)) {
          console.log(err.toJSON());
          if (!err.response) {
            setErrorMessage("User creation failed - No server response");
          } else if (err.response?.status === 400) {
            setErrorMessage(`User creation failed - ${err.message}`);
          } else if (err.response?.status !== 201) {
            setErrorMessage(
              `Status not equal to 201. Status = ${err.response?.status}`
            );
          } else {
            setErrorMessage("Login failed");
          }
        } else {
          console.log(err);
          setErrorMessage("Login failed - ");
        }
      }
    } else {
      setUserCreated(true);
      setSuccess(true);
    }
    // For later pages, user account will exist - update user in DB
    if (pageRoute === PageRoutes.FullNamePage && pageIsValid) {
      try {
        const response = await updateUser(userId, {
          firstName: firstname,
          surname: surname,
          signUpComplete: true,
        });
        const jsonUser = JSON.parse(JSON.stringify(response)).user;
        console.log(
          `SignUpPage onNext - jsonData = ${JSON.stringify(jsonUser)}`
        );
        setSuccess(true);
        // Update redux
        dispatch(setSignUpComplete(true));
      } catch (err) {
        setSuccess(false);
        errorRef.current?.focus();
        console.log(`Error with updateUser call, success var = ${success}`);
        if (axios.isAxiosError(err)) {
          console.log(err.toJSON());
          if (!err.response) {
            setErrorMessage("User update failed - No server response");
          } else if (err.response?.status === 400) {
            setErrorMessage(`User update failed - ${err.message}`);
          } else if (err.response?.status !== 201) {
            setErrorMessage(
              `Status not equal to 201. Status = ${err.response?.status}`
            );
          } else {
            setErrorMessage("Update failed");
          }
        } else {
          console.log(err);
          setErrorMessage("Update failed - ");
        }
      }
    }

    // Clear up and navigate to next page.
    if (success && pageRoute !== lastPage) {
      if (pageRoute === PageRoutes.PasswordPage) {
        // Clear email and password from redux before we navigate away
        dispatch(resetAll());
        // Navigate and replace password page with next one
        navigate(PageRouteArray[pageNum + 1], { replace: true });
      } else {
        navigate(PageRouteArray[pageNum + 1]);
      }
    } else if (success && pageRoute === lastPage) {
      // For last page - inform user they have completed the sign up!
      setModalData({
        title: "Sign up Complete",
        message: `Thank you for signing up, your account is complete. We will now direct you to log in.`,
        buttonText: "OK",
      });
      setRedirectModalIsOpen(true);
    }
  };

  // This modal is redirectional - as user has already completed their sign up
  // we redirect them to log in instead.
  const closeRedirectModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    setRedirectModalIsOpen(false);
  };
  // When the user closes the redirect modal (by any means) - redirect
  const handleAfterCloseRedirectModal = () => {
    navigate(`/${PageRoutes.LogInPage}`);
  };

  // Close the information modal.
  const closeInfoModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInfoModalIsOpen(false);
  };

  return (
    <React.Fragment>
      <main>
        <hr aria-hidden="true" />
        <div className="title">
          <h1>Sign up for our services</h1>
        </div>
        {/* TODO: Add CSS padding to make the <br> tags unneccesary? */}
        <br />
        {/* Draw breadcrumb trail, showing where the user is up to */}
        <BreadcrumbTrail currentStep={pageNum} />
        <br />
        {/* Output the header and page content for the step the user is currently at */}
        <div className="main-container">
          {/* Display inner pages here */}
          <Outlet />
          {/* Error message output */}
          <div
            className={errorMessage !== "" ? "solo-error-message" : "offscreen"}
          >
            <p ref={errorRef} aria-live="assertive">
              {errorMessage}
            </p>
          </div>
        </div>
        {/* Buttons are controlled here, rather than on the individual pages */}
        <div className="button-row">
          <button
            className="form-button h4-style"
            // Aria-disabled attribute not needed if disabled attribute included
            disabled={pageNum === 0 || pageNum === 3}
            // No need to add Aria role of 'button' if button has type='button'
            type="button"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            className="form-button h4-style"
            type="button"
            disabled={!pageIsValid}
            onClick={onNext}
          >
            {nextButtonText}
          </button>
        </div>
      </main>
      {/* Modal to redirect user to log in, if they have already completed their sign up */}
      <Modal
        isOpen={redirectModalIsOpen}
        aria={{
          labelledby: "title",
          describedby: "modal-text",
        }}
        ariaHideApp={true}
        className="modal"
        contentLabel="title"
        onAfterClose={handleAfterCloseRedirectModal}
        // This doesn't work - set in useEffect
        // appElement={document.getElementById("#root") || undefined}
      >
        <h5 className="title">{modalData.title}</h5>
        <div className="separator"></div>
        <p className="modal-text">{modalData.message}</p>
        <button onClick={closeRedirectModal}>{modalData.buttonText}</button>
      </Modal>
      {/* Modal for displaying information to the user */}
      <Modal
        isOpen={infoModalIsOpen}
        aria={{
          labelledby: "title",
          describedby: "modal-text",
        }}
        ariaHideApp={true}
        className="modal"
        // TODO: Currently not working - ??!
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
        <h5 className="title">{modalData.title}</h5>
        <div className="separator"></div>
        <p className="modal-text">{modalData.message}</p>
        <button onClick={closeInfoModal}>{modalData.buttonText}</button>
      </Modal>
    </React.Fragment>
  );
};

export default SignUpPage;
