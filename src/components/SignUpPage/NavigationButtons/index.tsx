import React from "react";
import { NavLink } from "react-router-dom";

import { PageRoutes } from "../../../router";
import { useAppSelector } from "../../../store";
import { selectIsValid } from "../../../store/signUpPages/selectors";

const NavigationButtons = ({ id }: { id: string }): React.JSX.Element => {
  const pageIsValid = useAppSelector(selectIsValid(id));

  let prevEnabled = false;
  // let nextEnabled = true;
  let prevLink = "";
  let nextLink = "";
  let lastPage = false;

  switch (id) {
    case PageRoutes.SignUpPage:
      prevEnabled = false;
      prevLink = PageRoutes.SignUpPage; // Nowhere back to go to
      nextLink = PageRoutes.UsernamePage;
      break;
    case PageRoutes.UsernamePage:
      prevEnabled = true;
      prevLink = PageRoutes.SignUpPage;
      nextLink = PageRoutes.PasswordPage;
      break;
    case PageRoutes.PasswordPage:
      prevEnabled = true;
      prevLink = PageRoutes.UsernamePage;
      // Currently - pages end here
      nextLink = PageRoutes.PasswordPage;
      lastPage = true;
    default:
      alert("SignUpPage - switch. No such page");
      return <></>;
  }

  return (
    <div>
      {/* Buttons will be controlled here, not via the individual pages 
            using valid status from Redux set by the inner page. */}
      <div className="button-row">
        <NavLink to={prevLink}>
          <button
            className="form-button h4-style"
            // Aria-disabled attibute not needed if disabled attribute included
            disabled={prevEnabled}
            // No need to add Aria role of 'button' if button has type='button'
            type="button"
          >
            Previous
          </button>
        </NavLink>
        {/* Next Button */}
        <NavLink to={nextLink}>
          <button
            className="form-button h4-style"
            type="button"
            disabled={!pageIsValid}
          >
            {lastPage ? "Submit" : "Next"}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationButtons;
