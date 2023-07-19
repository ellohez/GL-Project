import { screen } from "@testing-library/react";

import Header from ".";
import { renderComponent } from "../../../test/helpers/render";

describe("Header", () => {
  describe("render", () => {
    it("renders how we'd expect", () => {
      renderComponent(<Header />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Log In")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
      // SVG does not have 'alt text' so title is used instead
      expect(
        screen.getByTitle("Global Logic - A Hitachi Group Company")
      ).toBeInTheDocument();
    });
  });
});
