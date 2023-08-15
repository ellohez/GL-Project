import { isUndefined } from "lodash";
import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../store";
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
import {
  selectUserFirstName,
  selectUserLastName,
} from "../../../store/user/selectors";
import {
  setUserFirstName,
  setUserLastName,
} from "../../../store/user/userSlice";
import ValidationChecklist from "../../common/ValidationChecklist";

const FullNamePage = ({ id }: { id: string }): React.JSX.Element => {
  enum ValidationText {
    GivenNameTest = "Given name must contain only letters, spaces, hyphens or apostrophes",
    FamilyNameTest = "Family name must contain only letters, spaces, hyphens or apostrophes",
  }

  const dispatch = useAppDispatch();
  const isValid: boolean = useAppSelector(selectIsValid(id));

  const givenNameRef = useRef<HTMLInputElement>(null);
  const familyNameRef = useRef<HTMLInputElement>(null);
  const firstName = useAppSelector(selectUserFirstName);
  const surname = useAppSelector(selectUserLastName);

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

  const validateNames = () => {
    dispatch(resetMessages(id));
    dispatch(setValidFalse(id));

    // Regex allows letters in any language (e.g. é ü etc)
    // plus spaces, hyphens and apostrophes.
    const regex = new RegExp(/^[\p{L}\-']+([ \p{L}]+)*$/gmu);

    const givenNameTest = regex.test(firstName);
    // Reset the regex to start afresh
    regex.lastIndex = 0;
    const familyNameTest = regex.test(surname);

    dispatch(
      addMessage({
        message: {
          isError: !givenNameTest,
          text: ValidationText.GivenNameTest,
        },
        pageId: id,
      })
    );

    dispatch(
      addMessage({
        message: {
          isError: !familyNameTest,
          text: ValidationText.FamilyNameTest,
        },
        pageId: id,
      })
    );

    if (givenNameTest && familyNameTest) {
      dispatch(setValidTrue(id));
    }
  };

  // Store user entered data in state.
  const inputUpdated = () => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(setUserFirstName(givenNameRef.current?.value ?? ""));
    dispatch(setUserLastName(familyNameRef.current?.value ?? ""));

    validateNames();
  };

  return (
    <section>
      <div className="header">
        {/* Display the relevant title for the current page */}
        <h2>Full Name</h2>
      </div>
      <form action="" aria-labelledby="name-legend">
        <fieldset>
          <legend id="name-legend">Your given name and family-name</legend>
          <div className="given-name">
            <label
              className="help-label"
              htmlFor="given-name"
              id="given-namelabel"
            >
              Please enter your first (given) name:
              <span className="required" aria-hidden="true">
                Required
              </span>
            </label>
            <input
              className="block-input"
              autoFocus
              type="text"
              id="given-name"
              ref={givenNameRef}
              aria-labelledby="given-name-label"
              aria-required="true"
              aria-invalid={!isValid}
              autoComplete="given-name"
              value={firstName}
              onBlur={inputUpdated}
              onChange={inputUpdated}
              onInput={inputUpdated}
              onKeyDown={inputUpdated}
              onKeyUp={inputUpdated}
              onPaste={inputUpdated}
              required
            />
          </div>

          <div className="family-name">
            <label
              className="help-label"
              htmlFor="family-name"
              id="family-namelabel"
            >
              Please enter your family name (last name/surname):
              <span className="required" aria-hidden="true">
                Required
              </span>
            </label>
            <input
              className="block-input"
              type="text"
              id="family-name"
              ref={familyNameRef}
              aria-labelledby="family-name-label"
              aria-required="true"
              aria-invalid={!isValid}
              autoComplete="family-name"
              value={surname}
              onBlur={inputUpdated}
              onChange={inputUpdated}
              onInput={inputUpdated}
              onKeyDown={inputUpdated}
              onKeyUp={inputUpdated}
              onPaste={inputUpdated}
              required
            />
          </div>
          {/* Permanently show the error/success messages to give user consistent feedback */}
          <ValidationChecklist messageArray={messages} />
        </fieldset>
      </form>
    </section>
  );
};

export default FullNamePage;
