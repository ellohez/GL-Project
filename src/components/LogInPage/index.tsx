import { useAppSelector } from "../../store";
import {
  selectSignUpComplete,
  selectUserFullname,
} from "../../store/user/selectors";
import LogInForm from "../LogInForm";

const LogInPage = () => {
  const userName = useAppSelector(selectUserFullname);
  const signUpComplete = useAppSelector(selectSignUpComplete);

  return (
    <main>
      <LogInForm />

      <h1>Hello{signUpComplete ? ` ${userName}` : ""}!</h1>
    </main>
  );
};

export default LogInPage;
