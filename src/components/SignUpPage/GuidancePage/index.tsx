import React, { useEffect } from "react";

import { useAppDispatch } from "../../../store";
import {
  createPage,
  setValidTrue,
} from "../../../store/signUpPages/signUpPagesSlice";
import "../styles.css";

const GuidancePage = ({ id }: { id: string }): React.JSX.Element => {
  // Currently no user input or validation here,
  // so flag the page as valid on render
  const dispatch = useAppDispatch();

  useEffect(() => {
    // This page has nothing to validate
    dispatch(setValidTrue(id));
    // Ensure that there is always a state object for each page.
    // This reducer method will create one only if one doesn't
    // already exist.
    dispatch(createPage(id));
  });

  return (
    <div>
      <div className="header">
        {/* Display the relevant title for the current page */}
        {/* TODO: Make each page responsible for it's own title */}
        <h2>Sign Up - Guidance</h2>
      </div>
      {/* TODO: Include instructions for completing sign up - inc save option */}
      <h4>Instructions</h4>
      <ul id="instructions">
        <li>Thank you for your interest in our services.</li>
        <li>Our sign up process is split into small tasks.</li>
        <li>
          First, we will ask you to enter your email address and then choose a
          password.
        </li>
        <li>
          You will then have the option to save your progress and continue the
          rest of the process at a later date.
        </li>
        <li>
          This means that you do not have to complete all tasks in one sitting.
        </li>
        <li>You can do the other tasks in as many stages as you like.</li>
      </ul>
      <h4>Terms and Conditions</h4>
      <p id="terms_conditions">
        By continuing with the sign up procedure, you are agreeing to our{" "}
        <a
          className="terms"
          href="https://wordtickle.com/a-funny-story-about-terms-and-conditions/"
        >
          Terms and Conditions
        </a>
      </p>
      <br />
    </div>
  );
};

export default GuidancePage;
