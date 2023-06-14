import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";
import PageWrapper from "./components/common/PageWrapper";

const LandingPage = React.lazy(() => import("./components/LandingPage"));
const SignInPage = React.lazy(() => import("./components/SignInPage"));

export const enum PageRoutes {
  LandingPage = "/",
  SignInPage = "/sign-in",
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={PageRoutes.LandingPage} element={<App />}>
      <Route index element={<PageWrapper page={<LandingPage />} />} />
      <Route
        path={PageRoutes.SignInPage}
        element={<PageWrapper page={<SignInPage />} />}
      />
    </Route>
  )
);

export default router;
