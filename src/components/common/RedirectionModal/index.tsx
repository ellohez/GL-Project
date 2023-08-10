import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.css";

const RedirectionModal = ({
  message,
  redirectLink,
  trigger,
}: {
  message: string;
  redirectLink: string;
  trigger: boolean;
}): React.JSX.Element => {
  return trigger ? (
    <aside className="popup-outer" role="dialog" aria-modal="true">
      <div className="popup-inner">
        <p>{message}</p>
        {/* TODO: change this to link prop */}
        <NavLink to={redirectLink}>
          <button className="popup-button">Take me there!</button>
        </NavLink>
      </div>
    </aside>
  ) : (
    <div></div>
  );
};

export default RedirectionModal;
