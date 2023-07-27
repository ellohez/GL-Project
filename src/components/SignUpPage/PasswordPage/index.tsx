import { isUndefined } from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store";
import {
  setConfirmPassword,
  setPassword,
} from "../../../store/newUser/newUserSlice";
import {
  selectConfirmPassword,
  selectPassword,
} from "../../../store/newUser/selectors";
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

const PasswordPage = ({ id }: { id: string }): React.JSX.Element => {
  enum ValidationText {
    MinLength = "Password must contain at least 8 characters",
    MaxLength = "Password can only contain a maximum of 15 characters",
    SpecialCharacter = "Password must contain one of the following characters- !#$%&*€£@+=?",
    UppercaseCharacter = "Password must contain an uppercase letter",
    Number = "Password must contain a number",
    Match = "Password and confirmation must match",
  }

  // Selector hook for Redux store (getter)
  const password = useAppSelector(selectPassword);
  const passwordConfirm = useAppSelector(selectConfirmPassword);
  const isValid: boolean = useAppSelector(selectIsValid(id));
  // Password visibility toggle states
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [confirmPwdIsVisible, setConfirmPwdIsVisible] = useState(false);
  // get the Redux  dispatch hook to call actions
  const dispatch = useAppDispatch();

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  let messages = useAppSelector(selectMessages(id));
  if (isUndefined(messages)) {
    messages = [];
  }

  useEffect(() => {
    // Ensure that there is always a state object for each page.
    // This reducer method will create one only if one doesn't
    // already exist.
    dispatch(createPage(id));

    // On first render, add all error messages to state,
    // as user has not yet entered valid input
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

  const validatePassword = () => {
    // TODO: Validate for each stage - follow usernamePage example.
    // Can the password checklist npm github help? - steal regex?
    dispatch(resetMessages(id));
    dispatch(setValidFalse(id));
    // Note: No global flags required, just need to find one uppercase character,
    // one number and one special character
    const specialCharRegex = new RegExp("[!#$%&*€£@+=?]");
    const uppercaseCharRegex = new RegExp("[A-Z]");
    const numberRegex = new RegExp("[0-9]");

    const specialCharTest = specialCharRegex.test(password);
    const minCharTest = password.length >= 8;
    const maxCharTest = password.length <= 15;
    const uppercaseTest = uppercaseCharRegex.test(password);
    const numberTest = numberRegex.test(password);
    const pwdsMatchTest = password === passwordConfirm;

    if (
      specialCharTest &&
      minCharTest &&
      maxCharTest &&
      uppercaseTest &&
      numberTest &&
      pwdsMatchTest
    ) {
      dispatch(setValidTrue(id));
    }

    // Add messages again and set error = true/false for each
    dispatch(
      addMessage({
        message: {
          isError: !specialCharTest,
          text: ValidationText.SpecialCharacter,
        },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !minCharTest, text: ValidationText.MinLength },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !maxCharTest, text: ValidationText.MaxLength },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: {
          isError: !uppercaseTest,
          text: ValidationText.UppercaseCharacter,
        },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !numberTest, text: ValidationText.Number },
        pageId: id,
      })
    );
    dispatch(
      addMessage({
        message: { isError: !pwdsMatchTest, text: ValidationText.Match },
        pageId: id,
      })
    );
  };

  const inputUpdated = () => {
    dispatch(
      setPassword(
        // passwordInputRef.current === null ? "" : passwordInputRef.current.value
        passwordInputRef.current?.value ?? ""
      )
    );
    dispatch(
      setConfirmPassword(
        passwordConfirmInputRef.current === null
          ? ""
          : passwordConfirmInputRef.current.value
      )
    );
    validatePassword();
  };

  return (
    <section>
      <div className="header">
        {/* Display the relevant title for the current page */}
        {/* TODO: Make each page responsible for it's own title */}
        <h2>Password</h2>
      </div>
      <form aria-labelledby="enter-password">
        <fieldset>
          <legend id="enter-password">Create a new password</legend>
          <label className="help-label" htmlFor="password" id="pwd-label">
            Please enter a password, see checklist below for password
            constraints:
            <span className="required" aria-hidden="true">
              Required
            </span>
          </label>
          {/* Toggle between password visibility */}
          <div className="checkbox-combo" id="password-combo">
            <input
              id="pwdCheckbox"
              name="pwdCheckbox"
              type="checkbox"
              checked={pwdIsVisible}
              // aria-labelledby="pwdCheckboxLabel"
              // aria-checked={pwdIsVisible}
              onChange={() => {
                setPwdIsVisible((pwdIsVisible) => !pwdIsVisible);
              }}
            />
            <label
              className="checkbox-label"
              htmlFor="pwdCheckbox"
              id="pwdCheckboxLabel"
            >
              Show password?
            </label>
          </div>
          <input
            className="block-input"
            autoFocus
            name="password"
            id="password"
            autoComplete="new-password"
            type={pwdIsVisible ? "text" : "password"}
            ref={passwordInputRef}
            aria-labelledby="pwd-label"
            aria-describedby="pwd-desc"
            aria-required="true"
            aria-invalid={!isValid} // TODO: need two valid flags, one for each input?
            value={password}
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
          {/* <span className="help-label" id="pwd-desc">
            Passwords must be between 8 and 15 characters and include uppercase
            and lowercase letters and a number
          </span> */}
          <label
            className="help-label"
            htmlFor="password-confirm"
            id="pwd-confirm-label"
          >
            Please re-type your new password to confirm:
          </label>
          {/* Toggle between password visibility */}
          <div className="checkbox-combo" id="password-combo">
            <input
              id="pwdConfirmCheckbox"
              name="pwdConfirmCheckbox"
              type="checkbox"
              checked={confirmPwdIsVisible}
              // aria-labelledby="pwdConfirmCheckboxLabel"
              // aria-checked={confirmPwdIsVisible}
              onChange={() => {
                setConfirmPwdIsVisible(
                  (confirmPwdIsVisible) => !confirmPwdIsVisible
                );
              }}
            />
            <label
              className="checkbox-label"
              htmlFor="pwdConfirmCheckbox"
              id="pwdConfirmCheckboxLabel"
            >
              Show confirm password?
            </label>
          </div>
          <input
            className="block-input"
            name="password-confirm"
            id="password-confirm"
            type={confirmPwdIsVisible ? "text" : "password"}
            autoComplete="new-password"
            aria-labelledby="pwd-confirm-label"
            aria-required="true"
            aria-invalid={!isValid}
            value={passwordConfirm}
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
            ref={passwordConfirmInputRef}
          />
          {/* Permanently show the error/success messages to give user consistent feedback */}
          <ValidationChecklist messageArray={messages} />
        </fieldset>
      </form>
    </section>
  );
};

export default PasswordPage;
