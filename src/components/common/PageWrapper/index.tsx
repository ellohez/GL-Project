import React, { Suspense } from "react";

import funnyErrorImg from "../../../assets/funny-error-message.webp";

type PageWrapperProps = {
  page: React.ReactNode;
};

interface PageWrapperState {
  hasError: boolean;
}

export default class PageWrapper extends React.Component<
  PageWrapperProps,
  PageWrapperState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.warn({ error, errorInfo });
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          className="error-page"
          style={{ display: "flex", margin: "0 auto" }}
        >
          <h1>Oops!</h1>
          <p>Something went wrong.</p>
          <p>
            {/* Need to show error message here?  
            Can we use { isRouteErrorResponse } from "react-router-dom";*/}
            <i></i>
          </p>
          <img
            src={funnyErrorImg}
            style={{ maxWidth: "50%" }}
            alt="Stick man shocked by the word error"
          ></img>
        </div>
      );
    }

    return (
      <Suspense fallback={<div>loading...</div>}>{this.props.page}</Suspense>
    );
  }
}
