import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageRouteArray, PageRoutes } from "../../router";
import { postUser } from "../../services/users";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectEmail, selectPassword } from "../../store/newUser/selectors";
import { selectIsValid } from "../../store/signUpPages/selectors";
import { setSignUpComplete, setUserId } from "../../store/user/userSlice";
import { NewUser } from "../../types/services";
import BreadcrumbTrail from "../common/BreadcrumbTrail";
import "./styles.css";

// Used for Breadcrumb component - readable titles
export const formTitles: Array<string> = [
  "Sign Up - Guidance",
  "Username",
  "Secure your account",
  "Address",
];

const SignUpPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
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

  const [nextButtonText, setNextButtonText] = useState<string>("Next");
  // User can 'Save and Continue' once username and password complete
  // The last page should be 'Submit'
  useEffect(() => {
    setErrorMessage("");
    switch (pageRoute) {
      case PageRoutes.SignUpPage:
      case PageRoutes.UsernamePage:
        setNextButtonText("Next");
        break;
      case PageRoutes.PasswordPage:
        setNextButtonText("Save and Continue");
        break;
      case lastPage: // PageRoutes.AddressPage:
        setNextButtonText("Submit");
        break;
      default:
        setNextButtonText("Next");
    }
  }, [pageRoute, lastPage]);

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
  const onNext = async () => {
    setSuccess(false);
    // Before we navigate away, determine the page and complete any
    // necessary actions.

    if (pageRoute === PageRoutes.UsernamePage && pageIsValid) {
      //TODO: If username page, check if user already exists.
      setSuccess(true);
    }

    // If user exists and has completed their sign in, redirect to login
    // If user exists but needs to complete their sign up - acknowledge ??
    if (pageRoute === PageRoutes.PasswordPage && pageIsValid) {
      try {
        const response = await postUser(newUser);
        //savedUser.email = newUser.email;
        const jsonUser = JSON.parse(JSON.stringify(response)).user;
        console.log(
          `SignUpPage onNext - jsonData = ${JSON.stringify(jsonUser)}`
        );
        // TODO: improve this message:
        alert(`Your details have been saved. 
        You are free to either continue or return and complete at a later date. 
        To continue at a later date, please revisit the sign up form and enter your email and password`);

        storeUserData(jsonUser);
        setSuccess(true);
      } catch (err) {
        setSuccess(false);
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
    }
    // TODO: for later pages, update user in DB

    if (success) {
      navigate(PageRouteArray[pageNum + 1]);
    }
  };

  return (
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
      </div>

      <p
        // ref={errorRef}
        className="error-messsage"
        aria-live="assertive"
      >
        {errorMessage}
      </p>

      {/* Buttons are controlled here, rather than on the individual pages */}
      <div className="button-row">
        <button
          className="form-button h4-style"
          // Aria-disabled attribute not needed if disabled attribute included
          disabled={pageNum === 0}
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
  );
};

export default SignUpPage;
