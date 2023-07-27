import React, { useEffect } from "react";

import { useAppDispatch } from "../../../store";
import {
  createPage,
  setValidTrue,
} from "../../../store/signUpPages/signUpPagesSlice";

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
      <p id="instructions">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio
        at mollitia numquam provident aspernatur iure, necessitatibus officia a
        voluptates ducimus. Officiis, velit vel? Dicta ipsum ipsam quisquam
        consequuntur natus alias! Cum accusantium pariatur similique ab earum
        vel! Sit, accusamus!
      </p>
      <h4>Terms and Conditions</h4>
      <p id="terms_conditions">Terms and conditions to agree to here?</p>
      <br />
    </div>
  );
};

export default GuidancePage;
