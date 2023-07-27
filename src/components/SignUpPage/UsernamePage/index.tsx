import { isUndefined } from "lodash";
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../store";
import { setEmail } from "../../../store/newUser/newUserSlice";
import { selectEmail } from "../../../store/newUser/selectors";
import {
  selectIsValid,
  selectMessages,
} from "../../../store/signUpPages/selectors";
import {
  addMessage,
  createPage,
  resetMessages,
  setValidFalse,
  setValidTrue,
} from "../../../store/signUpPages/signUpPagesSlice";
import ValidationChecklist from "../../common/ValidationChecklist";

const UsernamePage = ({ id }: { id: string }): React.JSX.Element => {
  enum ValidationText {
    AtTest = "Email must contain the '@' symbol",
    StopTest = "Email must contain a full stop",
    FormatTest = "Email must be in the format - name@domain.com (or .co.uk)",
  }

  // selector hook for Redux store (getter)
  const email = useAppSelector(selectEmail);
  const isValid: boolean = useAppSelector(selectIsValid(id));
  // get the dispatch hook to call actions
  const dispatch = useAppDispatch();

  // Specify the correct type for useRef to give type safe access
  const inputEmailRef = useRef<HTMLInputElement>(null);

  let messages = useAppSelector(selectMessages(id));
  if (isUndefined(messages)) {
    messages = [];
  }

  useEffect(() => {
    // Ensure that there is always a state object for each page.
    // This reducer method will create one only if one doesn't
    // already exist.
    dispatch(createPage(id));
  });

  // On first render, add all error messages to state,
  // as user has not yet entered valid input
  useEffect(() => {
    if (messages?.length === 0) {
      for (const [, vText] of Object.entries(ValidationText)) {
        dispatch(
          addMessage({
            message: {
              isError: true,
              text: vText,
            },
            pageId: id,
          })
        );
      }
    }
  }, [ValidationText, dispatch, id, messages.length]);

  /* Validate and add the corresponding messages to
  redux state for this page */
  const validateEmail = () => {
    dispatch(resetMessages(id));
    dispatch(setValidFalse(id));
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );

    // TODO: rename these to __Test
    const atTest = email.includes("@");
    const stopTest = email.includes(".");
    const testFormat = emailRegex.test(email);
    if (atTest && stopTest && testFormat) {
      dispatch(setValidTrue(id));
    }

    dispatch(
      addMessage({
        message: { isError: !atTest, text: ValidationText.AtTest },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !stopTest, text: ValidationText.StopTest },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !testFormat, text: ValidationText.FormatTest },
        pageId: id,
      })
    );
  };

  // When the text is changed inside the input field, update state
  const inputUpdated = () => {
    dispatch(
      setEmail(
        inputEmailRef.current === null ? "" : inputEmailRef.current.value
      )
    );
    validateEmail();
  };

  return (
    <section>
      <div className="header">
        {/* Display the relevant title for the current page */}
        {/* TODO: Make each page responsible for it's own title */}
        <h2>Username</h2>
      </div>
      {/* Row of helper text, input or similar 
            control and then the error/success message */}
      <form aria-labelledby="email-legend" onInput={validateEmail}>
        <fieldset>
          <legend id="email-legend">Your email address</legend>
          {/* For accessibility - show the help text BEFORE the input */}
          <label className="help-label" htmlFor="email" id="email-label">
            Please enter a valid email address. E.g: <i>name@domain.com</i> or{" "}
            <i>name@domain.co.uk.</i>
            <span className="required" aria-hidden="true">
              Required
            </span>
          </label>
          <input
            className="block-input"
            autoFocus // For Screen Readers - this helps the focus start at the first input, rather than the buttons.
            name="email"
            id="email"
            data-testid="email"
            type="text"
            aria-labelledby="emailLabel"
            aria-required="true"
            aria-invalid={!isValid}
            value={email}
            autoComplete="email"
            ref={inputEmailRef}
            aria-errormessage={isValid ? "" : "validation-checklist"}
            aria-details={isValid ? "validation-checklist" : ""}
            // Lots of events handled to avoid issue with use of
            // autofill on browser not triggering onChange
            onBlur={inputUpdated}
            onChange={inputUpdated}
            onInput={inputUpdated}
            onKeyDown={inputUpdated}
            onKeyUp={inputUpdated}
            onPaste={inputUpdated}
          />
          {/* Permanently show the error/success messages to give user consistent feedback */}
          <ValidationChecklist messageArray={messages} />
        </fieldset>
      </form>
    </section>
  );
};

export default UsernamePage;
