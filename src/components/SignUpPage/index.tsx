import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageRouteArray, PageRoutes } from "../../router";
import { useAppSelector } from "../../store";
import { selectIsValid } from "../../store/signUpPages/selectors";
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
  const lastPage = PageRouteArray.length - 1;
  // Get isValid status for subpage from Redux.
  const pageIsValid = useAppSelector(selectIsValid(PageRouteArray[pageNum]));

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
      case PageRoutes.AddressPage:
        setNextButtonText("Submit");
        break;
      default:
        setNextButtonText("Next");
    }
  }, [pageRoute]);

  const onPrevious = () => {
    navigate(-1);
  };

  const onNext = () => {
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
          {/* {pageNum === lastPage ? "Submit" : "Next"} */}
        </button>
      </div>
    </main>
  );
};

export default SignUpPage;
