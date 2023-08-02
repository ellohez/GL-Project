import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageRouteArray, PageRoutes } from "../../router";
import { useAddNewUserMutation } from "../../services/usersAPI";
import { useAppSelector } from "../../store";
import { selectEmail, selectPassword } from "../../store/newUser/selectors";
import { selectIsValid } from "../../store/signUpPages/selectors";
import { NewUser, User } from "../../types/services";
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
  // Calculate the current page from the URL section
  const navigate = useNavigate();
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
    username: useAppSelector(selectEmail),
    password: useAppSelector(selectPassword),
  };

  const [nextButtonText, setNextButtonText] = useState<string>("Next");
  // User can 'Save and Continue' once username and password complete
  // The last page should be 'Submit'
  useEffect(() => {
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

  const [addNewUser, data] = useAddNewUserMutation();
  const savedUser: User = {
    username: newUser.username,
    password: newUser.password,
    id: -1,
  };
  const saveNewUser = async () => {
    //const userJsonData: string = JSON.stringify(newUser);
    //console.log(`SignUpPage.onNext adding new user = ${userJsonData}`);
    try {
      const payload = await addNewUser(newUser).unwrap();
      //console.log("fulfilled", payload);
      //console.log(`JSON.parse result`, JSON.parse(payload));
      const jsonData = JSON.parse(payload);
      savedUser.id = jsonData.id as number;
      //console.log(data.data);
    } catch (error) {
      console.log(`SignUpPage.saveNewUser rejected error = ${error}`);
    }
  };

  const onNext = async () => {
    // Before we navigate away, determine the page and complete any
    // necessary actions.

    //TODO: If username page, check if user already exists.

    if (pageRoute === PageRoutes.PasswordPage && pageIsValid) {
      await saveNewUser();
      // TODO: save ID to Redux - user slice.
      console.log("Data = ", data.data);
    }
    // TODO: for later pages, update user in DB

    console.log(
      "Finished saving user and result is: ",
      JSON.stringify(savedUser)
    );
    navigate(PageRouteArray[pageNum + 1]);
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
