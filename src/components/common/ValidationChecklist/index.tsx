import React from "react";
import { v4 as uuidv4 } from "uuid";

import { ValidationMessage } from "../../../store/signUpPages/state";
import "./styles.css";

interface ChecklistProps {
  messageArray: ValidationMessage[];
  trigger?: boolean;
}

const ValidationChecklist = ({
  messageArray,
  trigger = true,
}: ChecklistProps): React.JSX.Element => {
  //   if (!messageArray.length || !trigger) {
  //   return <div className="validation-checklist"></div>;
  // }
  return trigger && messageArray.length > 0 ? (
    <div
      id="validation-checklist"
      // This will instruct a screen reader to announce the validiation messages
      // as soon as possible. This role includes
      // an 'aria-live='assertive' region by default
      role="status"
      // To maximize compatibility, it is advised to add this redundant aria-live
      // when using the 'alert' role
      aria-live="polite"
      aria-atomic="true"
      className="validation-checklist"
    >
      <ul>
        {messageArray.map((message, i) => (
          <li
            className={message.isError ? "error-message" : "success-message"}
            // As this will be a list, each item will need a unique key
            key={uuidv4()}
          >
            {/* Font Awesome cross and tick - alt text added as titles
              - Titles no longer required, see visually-hidden spans*/}
            {message.isError ? (
              <>
                <i
                  className="fa-solid fa-xmark"
                  role="img"
                  id="error"
                  aria-hidden="true"
                  title="Error:"
                />
                {/* Visually hidden - screen reader friendly version of error message */}
                <span className="visually-hidden">Error: {message.text}</span>
              </>
            ) : (
              <>
                <i
                  className="fa-solid fa-check"
                  role="img"
                  id="ok"
                  aria-hidden="true"
                  title="OK:"
                />
                {/* Visually hidden - screen reader friendly version of success message */}
                <span className="visually-hidden">Correct: {message.text}</span>
              </>
            )}
            <span aria-hidden="true">
              {" "}
              - <span>{message.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="validation-checklist"></div>
  );
};

export default ValidationChecklist;
