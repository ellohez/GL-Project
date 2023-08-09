import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";

import { PageRoutes } from "../../router";
import { loginUser } from "../../services/users";
import { useAppDispatch } from "../../store";
import {
  setSignUpComplete,
  setUserFirstName,
  setUserId,
  setUserLastName,
} from "../../store/user/userSlice";
import RedirectionModal from "../common/RedirectionModal";

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  // User entered form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Used to trigger the RedirectionalModal appearance if user needs to
  // complete the sign up procedure to continue.
  const [redirect, setRedirect] = useState(false);

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
      setRedirect(true);
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

    try {
      const response = await loginUser({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      // console.log(response);
      setErrorMessage("Login Successful");
      storeUserDetails(JSON.stringify(response));
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log("Error with loginUser call");
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
        if (!error.response) {
          setErrorMessage("Login failed - No server response");
        } else if (error.response?.status === 400) {
          setErrorMessage(`Login failed - user does not exist`);
        } else if (error.response?.status !== 200) {
          setErrorMessage(
            `Status not equal to 200. Status = ${error.response?.status}`
          );
        } else {
          setErrorMessage("Login failed");
        }
      } else {
        console.log(error);
        setErrorMessage("Login failed - ");
      }
    }
  };

  return (
    <div className="outer-form">
      <RedirectionModal
        message={
          "You have not completed your sign up, you will be redirected to do this."
        }
        redirectLink={`/${PageRoutes.SignUpPage}`}
        trigger={redirect}
      />
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
  );
};

export default LogInForm;
