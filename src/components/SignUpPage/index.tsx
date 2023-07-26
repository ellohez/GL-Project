import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { PageRoutes } from "../../router";
import { useAppSelector } from "../../store";
import { selectIsValid } from "../../store/signUpPages/selectors";
import BreadcrumbTrail from "../common/BreadcrumbTrail";
import "./styles.css";

// TODO: Remove this once pages added to router?
// Could add title to page but also used as index for Redux
export const formTitles: Array<string> = [
  "Sign Up - Guidance",
  "Username",
  "Secure your account",
  "Address",
];

const SignUpPage = (): React.JSX.Element => {
  // Use Enum values from router - for list of routes
  // Sign up Page has Guidance page as the default (index) element so no direct path to GuidancePage needed
  const pages: string[] = [
    PageRoutes.SignUpPage,
    PageRoutes.UsernamePage,
    PageRoutes.PasswordPage,
  ];

  // const location = useLocation();
  // Find index of last '/' in pathname use string.substring(string.lastIndexOf("/"))
  // const indexToSplitBy = location.pathname.lastIndexOf("/");
  // let pageId: string = location.pathname.substring(indexToSplitBy);
  // pageId = pageId.replace("/", "").trim();
  // let linkNextPage = pages[1]; // Initialise to 1st page after guidance page which is the index page
  // useEffect(() => {
  //   //setPage(page + 1);
  //   linkNextPage = pages[currentPage + 1];
  // }, [pageIsValid]);
  // const lastPage = formTitles.length - 1;

  // Store the current page the user will view next
  const [currentPage, setCurrentPage] = useState(0);
  const lastPage = pages.length - 1;
  const pageIsValid = useAppSelector(selectIsValid(formTitles[currentPage]));
  const navigate = useNavigate();

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
    navigate(-1);
  };

  const onNext = () => {
    navigate(pages[currentPage + 1]);
    setCurrentPage(currentPage + 1);
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
      <BreadcrumbTrail currentStep={currentPage} />
      <br />

      {/* Output the header and page content for the step the user is currently at */}
      <div className="main-container">
        <div className="header">
          {/* Display the relevant title for the current page */}
          {/* TODO: Make each page responsible for it's own title */}
          <h2>{formTitles[currentPage]}</h2>
        </div>
        <div className="separator"></div>
        {/* <PageDisplay page={page} /> */}

        {/* Display inner pages here */}
        <Outlet />
      </div>

      {/* Buttons will be controlled here, not via the individual pages 
        using valid status from Redux set by the inner page. */}
      {/* <NavigationButtons id={pageId} /> */}
      <div className="button-row">
        <button
          className="form-button h4-style"
          // Aria-disabled attribute not needed if disabled attribute included
          disabled={currentPage === 0}
          // No need to add Aria role of 'button' if button has type='button'
          type="button"
          // onClick={() => {
          //   setPage((currentPg: number) => currentPg - 1);
          // }}
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="form-button h4-style"
          type="button"
          disabled={!pageIsValid}
          // onClick={() => {
          //   setPage((currentPg: number) => currentPg + 1);
          // }}
          onClick={onNext}
        >
          {currentPage === lastPage ? "Submit" : "Next"}
        </button>
      </div>
    </main>
  );
};

export default SignUpPage;
