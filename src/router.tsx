import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";

import App from "./App";
import AddressPage from "./components/SignUpPage/AddressPage";
import PageWrapper from "./components/common/PageWrapper";

// import { userLoader } from "./loaders";

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
  AddressPage = "address",
}

// Use Enum values from router - for list of routes
// Sign up Page has Guidance page as the default (index) element so no direct path to GuidancePage needed
export const PageRouteArray: string[] = [
  PageRoutes.SignUpPage,
  PageRoutes.UsernamePage,
  PageRoutes.PasswordPage,
  PageRoutes.AddressPage,
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
      <Route
        index
        element={<PageWrapper page={<LandingPage />} />}
        //loader={userLoader}
      />
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
            <PageWrapper page={<GuidancePage id={PageRoutes.SignUpPage} />} />
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
        <Route
          path={PageRoutes.AddressPage}
          element={
            <PageWrapper page={<AddressPage id={PageRoutes.AddressPage} />} />
          }
        />
      </Route>

      {/* Catch unmatched route */}
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

export default router;
