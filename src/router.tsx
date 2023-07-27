import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";

import App from "./App";
import PageWrapper from "./components/common/PageWrapper";

const LandingPage = React.lazy(() => import("./components/LandingPage"));
const LogInPage = React.lazy(() => import("./components/LogInPage"));
const SignUpPage = React.lazy(() => import("./components/SignUpPage"));
const GuidancePage = React.lazy(
  () => import("./components/SignUpPage/GuidancePage")
);
const UsernamePage = React.lazy(
  () => import("./components/SignUpPage/UsernamePage")
);
const PasswordPage = React.lazy(
  () => import("./components/SignUpPage/PasswordPage")
);

export const enum PageRoutes {
  LandingPage = "/",
  LogInPage = "log-in",
  SignUpPage = "sign-up", // This includes GuidancePage as index
  UsernamePage = "username",
  PasswordPage = "secure",
}

//TODO: Remove if no longer necessary
export const formTitles: Array<string> = [
  "Sign Up - Guidance",
  "Username",
  "Secure your account",
  "Address",
];

const NoMatch = () => {
  const location = useLocation();
  return (
    <div>
      <h1>OOPs!</h1>
      <p>{`404. Bad URL- ${location.pathname} not found.`}</p>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PageRoutes.LandingPage} element={<App />}>
      <Route index element={<PageWrapper page={<LandingPage />} />} />
      <Route
        path={PageRoutes.LogInPage}
        element={<PageWrapper page={<LogInPage />} />}
      />
      <Route
        path={PageRoutes.SignUpPage}
        element={<PageWrapper page={<SignUpPage />} />}
      >
        {/* Use URL page location section as ID for Redux */}
        <Route
          index
          element={
            <PageWrapper page={<GuidancePage id={PageRoutes.LandingPage} />} />
          }
        />
        <Route
          path={PageRoutes.UsernamePage}
          element={
            <PageWrapper page={<UsernamePage id={PageRoutes.UsernamePage} />} />
          }
        />
        <Route
          path={PageRoutes.PasswordPage}
          element={
            <PageWrapper page={<PasswordPage id={PageRoutes.PasswordPage} />} />
          }
        />
      </Route>

      {/* TODO: Implement this */}
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

export default router;
