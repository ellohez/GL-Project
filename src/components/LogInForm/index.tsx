import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useAppDispatch } from "../../store";
import { setUserFirstName, setUserLastName } from "../../store/user/userSlice";

// import { NewUser } from "../../types/services";

export const LogInForm = () => {
  // const [firstname, setFirstName] = useState("");
  // const [lastname, setLastName] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // TODO: attempt login using email and password

    // TODO: If user does not exist, or sign up is incomplete
    // - redirect to signUpPages

    // dispatch(setUserFirstName(firstname));
    // dispatch(setUserLastName(lastname));
  };

  // TODO: implement a show password checkbox

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default LogInForm;
