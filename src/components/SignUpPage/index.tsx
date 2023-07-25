import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { PageRoutes } from "../../router";
import { useAppSelector } from "../../store";
import { selectIsValid } from "../../store/signUpPages/selectors";
import BreadcrumbTrail from "../common/BreadcrumbTrail";
// import PageDisplay from "./PageDisplay";
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
  // To attach next button to the router.
  const navigate = useNavigate();

  // Use Enum values from router - for list of routes
  // Sign up Page has Guidance page as the default (index) element so no direct path to GuidancePage needed
  const pages: string[] = [
    PageRoutes.SignUpPage,
    PageRoutes.UsernamePage,
    PageRoutes.PasswordPage,
  ];

  // Store the current page the user will view next
  const [page, setPage] = useState(0);
  const lastPage = formTitles.length - 1;
  const pageIsValid = useAppSelector(selectIsValid(formTitles[page]));

  useEffect(() => {
    setPage(page + 1);
  }, []);

  return (
    <main>
      <hr aria-hidden="true" />
      <div className="title">
        <h1>Sign up for our services</h1>
      </div>
      {/* TODO: Add CSS padding to make the <br> tags unneccesary? */}
      <br />
      {/* Draw breadcrumb trail, showing where the user is up to */}
      <BreadcrumbTrail currentStep={page} />
      <br />

      {/* Output the header and page content for the step the user is currently at */}
      <div className="main-container">
        <div className="header">
          {/* Display the relevant title for the current page */}
          {/* TODO: Make each page responsible for it's own title */}
          <h2>{formTitles[page]}</h2>
        </div>
        <div className="separator"></div>
        {/* <PageDisplay page={page} /> */}

        {/* Display inner pages here */}
        <Outlet />
      </div>

      {/* Buttons will be controlled here, not via the individual pages */}
      <div className="button-row">
        <button
          className="form-button h4-style"
          // Aria-disabled attibute not needed if disabled attribute included
          disabled={page === 0}
          // No need to add Aria role of 'button' if button has type='button'
          type="button"
          onClick={() => {
            setPage((currentPg: number) => currentPg - 1);
          }}
        >
          Previous
        </button>
        <NavLink to={pages[page + 1]}>
          <button
            className="form-button h4-style"
            type="button"
            disabled={!pageIsValid}
            // onClick={() => {
            //   setPage((currentPg: number) => currentPg + 1);
            // }}
          >
            {page === lastPage ? "Submit" : "Next"}
          </button>
        </NavLink>
      </div>
    </main>
  );
};

export default SignUpPage;
