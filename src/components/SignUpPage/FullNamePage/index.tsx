import { isUndefined } from "lodash";
import { ChangeEventHandler, useEffect, useState } from "react";

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
import ValidationChecklist from "../../common/ValidationChecklist";

const FullNamePage = ({ id }: { id: string }) => {
  enum ValidationText {
    GivenName = "Given name contains non-letters, hyphens or apostrophes",
    FamilyName = "Family name contains non-letters, hyphens or apostrophes",
  }

  const dispatch = useAppDispatch();
  const isValid: boolean = useAppSelector(selectIsValid(id));
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
  });

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
    const regex = new RegExp(/^[\p{L}\-']+([ \p{L}]+)*$/gmu);

    const givenNameTest = regex.test(formData.givenName);
    const familyNameTest = regex.test(formData.familyName);

    dispatch(
      addMessage({
        message: {
          isError: !givenNameTest,
          text: ValidationText.GivenName,
        },
        pageId: id,
      })
    );

    dispatch(
      addMessage({
        message: {
          isError: !familyNameTest,
          text: ValidationText.FamilyName,
        },
        pageId: id,
      })
    );

    if (givenNameTest && familyNameTest) {
      dispatch(setValidTrue(id));
    }
  };

  // Store user entered data in state.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
              aria-labelledby="given-name-label"
              aria-required="true"
              aria-invalid={!isValid}
              autoComplete="given-name"
              value={formData.givenName}
              onInput={handleChange}
              required
            />
          </div>

          <div className="family-name">
            <label
              className="help-label"
              htmlFor="family-name"
              id="family-namelabel"
            >
              Please enter your family name (surname):
              <span className="required" aria-hidden="true">
                Required
              </span>
            </label>
            <input
              className="block-input"
              autoFocus
              type="text"
              id="family-name"
              aria-labelledby="family-name-label"
              aria-required="true"
              aria-invalid={!isValid}
              autoComplete="family-name"
              value={formData.familyName}
              onInput={handleChange}
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
