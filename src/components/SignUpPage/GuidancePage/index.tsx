import React, { useEffect } from "react";

import { useAppDispatch } from "../../../store";
import { setValidTrue } from "../../../store/signUpPages/signUpPagesSlice";

const GuidancePage = ({ id }: { id: string }): React.JSX.Element => {
  // Currently no user input or validation here,
  // so flag the page as valid on render
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setValidTrue(id));
  });

  return (
    <div>
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
