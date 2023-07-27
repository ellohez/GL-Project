import React, { Fragment } from "react";

import { formTitles } from "../../SignUpPage";
import "./styles.css";

const BreadcrumbTrail = ({
  currentStep,
}: {
  currentStep: number;
}): React.JSX.Element => {
  //  Create an array of Fragments
  const content: Array<JSX.Element> = [];

  for (let i = 0; i <= currentStep; i++) {
    content.push(
      <Fragment key={formTitles[i]}>
        <div
          className="crumb"
          // if last element - mark as current step for aria,
          // mark all others as false
          aria-current={i === currentStep ? "step" : "false"}
        >
          <strong>Step {i + 1}</strong>
          <p>{formTitles[i]}</p>
        </div>
        <div className="divider" aria-hidden="true">
          {/* Add chevrons but only BETWEEN steps */}
          {i >= currentStep ? null : (
            <i className="fa-solid fa-chevron-right"></i>
          )}
        </div>
      </Fragment>
    );
  }

  content.push(
    <div key="stepsRemaining" className="crumb">
      <strong>Steps Remaining</strong>
      <p>{formTitles.length - currentStep}</p>
    </div>
  );

  return <div className="breadcrumb-trail">{content}</div>;
};

export default BreadcrumbTrail;
