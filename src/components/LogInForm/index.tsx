import axios from "axios";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { PageRoutes } from "../../router";
import { loginUser } from "../../services/users";
import { useAppDispatch } from "../../store";
import {
  setSignUpComplete,
  setUserFirstName,
  setUserId,
  setUserLastName,
} from "../../store/user/userSlice";

export const LogInForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const outerFormRef = useRef<HTMLDivElement>(null);
  // User entered form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Used to trigger the Modal appearance if user needs to
  // complete the sign up procedure to continue.
  const [redirectModalIsOpen, setRedirectModalIsOpen] = useState(false);

  useEffect(() => {
    // Before we draw any modals, bind the modal to the app
    Modal.setAppElement("#root");
  });

  // For successful login - add user details to redux
  const storeUserDetails = (loginResult: string) => {
    const fullUser = JSON.parse(loginResult).user;
    // TODO: handle the access token
    const accessToken = JSON.parse(loginResult).accessToken;
    //TODO: remove test code:
    console.log(fullUser.firstName, " ", fullUser.surname, " ", accessToken);

    dispatch(setUserId(fullUser.id));
    dispatch(setSignUpComplete(fullUser.signUpComplete));
    // Redirect user to complete their signup if incomplete.
    if (fullUser.id > -1 && !fullUser.signUpComplete) {
      setRedirectModalIsOpen(true);
    }
    // If user has completed the sign up procedure, store their details
    dispatch(setUserFirstName(fullUser.firstName));
    dispatch(setUserLastName(fullUser.surname));
  };

  // Store user entered data in state.
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // TODO: compare emails as lowercase
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      // console.log(response);
      setErrorMessage("Login Successful");
      storeUserDetails(JSON.stringify(response));
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.log("Error with loginUser call");
      errorRef.current?.focus();
      if (axios.isAxiosError(err)) {
        console.log(err.toJSON());
        if (!err.response) {
          setErrorMessage("Login failed - No server response");
        } else if (err.response?.status === 400) {
          setErrorMessage(
            `Login failed - unknown email or password, please check and try again`
          );
        } else if (err.response?.status !== 200) {
          setErrorMessage(
            `Status not equal to 200. Status = ${err.response?.status}`
          );
        } else {
          setErrorMessage("Login failed");
        }
      } else {
        console.log(err);
        setErrorMessage(`Login failed - ${err}`);
      }
    }
  };

  // This modal is redirectional - as user has already completed their sign up
  // we redirect them to log in instead.
  const closeRedirectModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    setRedirectModalIsOpen(false);
    navigate(`/${PageRoutes.SignUpPage}`);
  };

  return (
    <React.Fragment>
      <div className="outer-form" ref={outerFormRef}>
        <form onSubmit={handleSubmit}>
          {/* TODO: implement a show password checkbox */}
          <fieldset>
            <label className="help-label" htmlFor="email" id="emailLabel">
              Your email:
            </label>
            <input
              className="block-input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-labelledby="emailLabel"
              aria-required="true"
              onInput={handleChange}
              value={formData.email}
              required
            />
            <label className="help-label" htmlFor="password" id="pwd-label">
              Your password:
            </label>
            <input
              className="block-input"
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              aria-labelledby="pwd-label"
              aria-required="true"
              onInput={handleChange}
              value={formData.password}
              required
            />
            <p
              ref={errorRef}
              className={errorMessage ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errorMessage}
            </p>
          </fieldset>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      <Modal
        isOpen={redirectModalIsOpen}
        aria={{
          labelledby: "title",
          describedby: "modal-text",
        }}
        ariaHideApp={true}
        className="modal"
        // appElement={document.getElementById("#root") || undefined}
      >
        <h5 className="title">More information needed</h5>
        <p className="modal-text">
          You have not completed your sign up, so we will redirect you to do
          this.
        </p>
        <button onClick={closeRedirectModal}>Take me there!</button>
      </Modal>
    </React.Fragment>
  );
};

export default LogInForm;
