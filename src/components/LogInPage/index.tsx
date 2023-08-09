import { useAppSelector } from "../../store";
import { selectUserFullname } from "../../store/user/selectors";
import LogInForm from "../LogInForm";

const LogInPage = () => {
  const userName = useAppSelector(selectUserFullname);

  return (
    <main>
      <LogInForm />

      <h1>Hello {userName ? userName : ""}</h1>
    </main>
  );
};

export default LogInPage;
