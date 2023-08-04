import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { PageRoutes } from "../../router";
import { useLoginUserMutation } from "../../services/authAPI";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectSignUpComplete, selectUserId } from "../../store/user/selectors";
import {
  setSignUpComplete,
  setUserFirstName,
  setUserId,
  setUserLastName,
} from "../../store/user/userSlice";
import { NewUser } from "../../types/services";
import RedirectionModal from "../common/RedirectionModal";

export const LogInForm = () => {
  const dispatch = useAppDispatch();
  const userCompletedSignup = useAppSelector(selectSignUpComplete);
  const userId = useAppSelector(selectUserId);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);

  const [loginUser, { data: loginResult, status, error, isError, isLoading }] =
    useLoginUserMutation();
  const attemptLogin = (user: NewUser) => {
    // Attempt login using email and password
    loginUser(user);

    // Deal with any API related issues
    if (isLoading) {
      // TODO: open loader component
    }
    if (isError || !loginResult || error) {
      console.error(`Login failed - Error = ${error}`);
      const errorString = JSON.stringify(error);
      const statusString = JSON.stringify(status);
      const resString = JSON.stringify(loginResult);
      alert(`Login failed - error = ${errorString} 
                        status = ${statusString}
                        result = ${resString}`);
    } else {
      alert("Login successful");
      console.log(loginResult);
      storeUserDetails();
      // If user exists but has not completed the sign up procedure
      // redirect them to do so.
      if (userId > -1 && !userCompletedSignup) {
        setRedirect(true);
      }
    }

    // TODO: If user does not exist, or sign up is incomplete
    // - redirect to signUpPages
  };

  const storeUserDetails = () => {
    const fullUser = JSON.parse(loginResult).user;
    // TODO: handle the access token
    const accessToken = JSON.parse(loginResult).accessToken;
    dispatch(setUserFirstName(fullUser.firstName));
    dispatch(setUserLastName(fullUser.surname));
    dispatch(setSignUpComplete(fullUser.signUpComplete));
    dispatch(setUserId(fullUser.id));
    //console.log(fullUser.firstName, " ", fullUser.surname, " ", accessToken);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const user: NewUser = {
      email: formData.email,
      password: formData.password,
    };
    attemptLogin(user);
  };

  // return (redirect) ?
  //   (
  //     <RedirectionModal
  //       message={"You have not completed your sign up, you will be redirected to do this."}
  //       redirectLink={`/${PageRoutes.SignUpPage}`}
  //       trigger={true} />
  //   ) :

  return (
    <div>
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
        </fieldset>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default LogInForm;
