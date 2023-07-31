import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { PageRouteArray } from "../../router";
import { useAppSelector } from "../../store";
import { selectIsValid } from "../../store/signUpPages/selectors";
import BreadcrumbTrail from "../common/BreadcrumbTrail";
import "./styles.css";

// Used for Breadcrumb component - readable titles
export const formTitles: Array<string> = [
  "Sign Up - Guidance",
  "Username",
  "Secure your account",
  // "Address",
];

const SignUpPage = (): React.JSX.Element => {
  // Store the current page the user will view next
  // const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const currentPath = pathname.replace("/sign-up/", "");
  //TODO: Remove test code
  // console.log(`Pathname = ${pathname} - Current Path = ${currentPath}`);
  let pageNum: number = PageRouteArray.findIndex(
    (route) => route === currentPath
  );
  if (pageNum < 0) {
    // TODO: Throw error here.
    pageNum = 0;
  }
  const lastPage = PageRouteArray.length - 1;

  const pageIsValid = useAppSelector(
    selectIsValid(PageRouteArray[pageNum])
    // selectIsValid(PageRouteArray[currentPage])
  );

  const onPrevious = () => {
    // setCurrentPage(currentPage - 1);
    navigate(-1);
  };

  const onNext = () => {
    navigate(PageRouteArray[pageNum + 1]);
    // navigate(PageRouteArray[currentPage + 1]);
    // setCurrentPage(currentPage + 1);
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
          {pageNum === lastPage ? "Submit" : "Next"}
        </button>
      </div>
    </main>
  );
};

export default SignUpPage;
