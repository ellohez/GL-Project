import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useAppDispatch } from "../../store";
import { setUserFirstName, setUserLastName } from "../../store/user/userSlice";

export const LogInForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const dispatch = useAppDispatch();

  const handleFirstNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setUserFirstName(firstname));
    dispatch(setUserLastName(lastname));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstname">Your first name:</label>
      <input
        id="firstname"
        name="firstname"
        onInput={handleFirstNameInput}
        value={firstname}
        required
      />
      <label htmlFor="lastname">Your last name:</label>
      <input
        id="lastname"
        name="lastname"
        onInput={handleLastNameInput}
        value={lastname}
        required
      />

      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default LogInForm;
