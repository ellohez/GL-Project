import { Fragment, useState } from "react";

import UserData from "../../types/types";
import EmailPage from "./EmailPage";
import GuidancePage from "./GuidancePage";
import PasswordPage from "./PasswordPage";
import "./styles.css";

const SignUpPage = (): JSX.Element => {
  // List of form pages
  const formTitles: Array<string> = [
    "Sign Up - Guidance",
    "Email Address",
    "Password",
    "Address",
  ];

  // TS type for formData
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    surname: "",
    birthDate: null,
    address: "",
  });

  const PageDisplay = () => {
    if (page === 0) {
      return <GuidancePage />;
    } else if (page === 1) {
      return <EmailPage userData={userData} setUserData={setUserData} />;
    } else if (page === 2) {
      return <PasswordPage userData={userData} setUserData={setUserData} />;
    }
  };

  // Store the current page the user is viewing
  const [page, setPage] = useState<number>(0);

  // TODO: Make this a separate component
  const BreadcrumbDisplay = () => {
    const content: Array<JSX.Element> = [];

    for (let i = 0; i <= page; i++) {
      content.push(
        <Fragment key={formTitles[i]}>
          <div
            className="crumb"
            // key={i.toString()}
            // if last element - mark as current step for aria,
            // mark all others as false
            aria-current={i === page ? "step" : "false"}
          >
            <h5>Step {i + 1}</h5>
            <p>{formTitles[i]}</p>
          </div>
          <div className="divider">
            {/* Add chevrons but only BETWEEN steps */}
            {i >= page ? null : (
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            )}
          </div>
        </Fragment>
      );
    }

    content.push(
      <div className="crumb">
        <h5>Steps Remaining</h5>
        <p>{formTitles.length - page}</p>
      </div>
    );

    return <div className="breadcrumb-trail">{content}</div>;
  };

  return (
    <>
      <main>
        <hr aria-hidden="true" />
        <div className="title">
          <h1>Let's get you signed up!</h1>
        </div>
        {/* TODO: Add CSS padding to make the <br> tags unneccesary? */}
        <br />
        {/* Draw breadcrumb trail, showing where the user is up to */}
        {BreadcrumbDisplay()}
        <br />

        {/* Output the header and page content for the step the user is currently at */}
        <div className="main-container">
          <div className="header">
            {/* Display the relevant title for the current page */}
            <h3>{formTitles[page]}</h3>
          </div>
          <div className="separator"></div>
          {PageDisplay()}
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
          <button
            className="form-button h4-style"
            type="button"
            // TODO: Enable child page components to disable the next button
            disabled={page === formTitles.length - 1}
            onClick={() => {
              setPage((currentPg: number) => currentPg + 1);
            }}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
