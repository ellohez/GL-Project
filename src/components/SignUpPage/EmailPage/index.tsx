import React, { ChangeEvent, FocusEvent, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store";
import { setEmail } from "../../../store/newUser/newUserSlice";
import { selectEmail } from "../../../store/newUser/selectors";
import { selectIsValid } from "../../../store/signUpPages/selectors";
import {
  setValidFalse,
  setValidTrue,
} from "../../../store/signUpPages/signUpPagesSlice";

const EmailPage = ({ id }: { id: string }): React.JSX.Element => {
  // selector hook for Redux store (getter)
  const email = useAppSelector(selectEmail);
  const pageIsValid = useAppSelector(selectIsValid(id));
  // get the dispatch hook to call actions
  const dispatch = useAppDispatch();
  // const [emailValid, setEmailValid] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  // Specify the correct type for useRef to give type safe access
  const emailErrorDiv = useRef<HTMLDivElement>(null);
  let emailErrorMessage = "";

  // When the email input has and then loses focus -
  // validate the user's entry and update accordingly.
  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    setIsBlur(true);

    /* TODO: ** Validate using sections of the RegEx and add the corresponding
    messages to redux state for this page */
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    // setEmailValid(emailRegex.test(email));
    emailRegex.test(email)
      ? dispatch(setValidTrue(id))
      : dispatch(setValidFalse(id));
  };

  const validateEmail = () => {};

  // If email is not valid, determine what is wrong
  // and give a specific error message
  // TODO: see ** todo above
  const emailErrorHTML = () => {
    if (isBlur) {
      if (email === "") {
        emailErrorMessage = "An email address is required";
      } else if (!email.includes("@")) {
        emailErrorMessage =
          "The email address you entered is missing the at '@' symbol";
      } else if (!email.includes(".")) {
        emailErrorMessage =
          "The email address you entered is missing a full stop";
      } else {
        emailErrorMessage = "The email address is not quite right";
      }
      return (
        <p className="error">
          <span>&#10007;</span>
          {emailErrorMessage}
        </p>
      );
    } else if (!isBlur) {
      emailErrorMessage = "";
      return <></>;
    }

    return (
      <p className="success">
        <span>&#10003;</span>The email you entered looks good
      </p>
    );
  };

  // When the text is changed inside the input field, update state
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  return (
    <main>
      {/* Row of helper text, input or similar 
            control and then the error/success message */}
      <form aria-labelledby="enter-email">
        <fieldset>
          <legend id="Your email address">Your email address</legend>
          <label className="help-label" htmlFor="email" id="email-label">
            Please enter a valid email address, e.g <i>name@domain.com</i> or{" "}
            <i>name@domain.co.uk</i>
          </label>
          <input
            className="block-input"
            autoFocus // For Screen Readers - this helps the focus start at the first input, rather than the buttons.
            name="email"
            id="email"
            type="text"
            aria-labelledby="emailLabel"
            aria-required="true"
            aria-invalid={isBlur && !pageIsValid}
            value={email}
            autoComplete="email"
            onBlur={blurHandler}
            onChange={changeHandler}
          />
          <div
            className="feedback-text"
            id="emailErrorDiv"
            ref={emailErrorDiv}
            // Once user has tried to input - show
            aria-hidden={!isBlur}
            role="alert"
          >
            {emailErrorHTML()}
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default EmailPage;
