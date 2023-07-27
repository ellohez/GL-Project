import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { PageRouteArray } from "../../../router";
import "./styles.css";

const BreadcrumbTrail = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}): React.JSX.Element => {
  // const location = useLocation();
  //  Create an array of Fragments
  const content: Array<JSX.Element> = [];

  for (let i = 0; i <= currentStep; i++) {
    content.push(
      <Fragment key={PageRouteArray[i]}>
        <div
          className="crumb"
          // if last element - mark as current step for aria,
          // mark all others as false
          aria-current={i === currentStep ? "step" : "false"}
        >
          {/* <strong>Step {i + 1}</strong> */}
          {/* <p>{formTitles[i]}</p> */}
          <p>{PageRouteArray[i]}</p>
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
      <strong>{`Step ${currentStep + 1} of ${totalSteps}`}</strong>
      {/* <p>{formTitles.length - currentStep}</p> */}
      {/* <p>{PageRouteArray.length - currentStep}</p> */}
    </div>
  );

  return <div className="breadcrumb-trail">{content}</div>;
};

export default BreadcrumbTrail;
