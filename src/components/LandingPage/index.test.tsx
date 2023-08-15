import { screen } from "@testing-library/react";

import LandingPage from ".";
import { renderComponent } from "../../../test/helpers/render";

describe("Landing Page", () => {
  describe("render", () => {
    it("renders how we'd expect", () => {
      renderComponent(<LandingPage />);

      expect(screen.getByText("Welcome!")).toBeInTheDocument();
      expect(screen.getByText("These headings... (h2)")).toBeInTheDocument();
      expect(
        screen.getByText("...are here to enable... (h3)")
      ).toBeInTheDocument();
      expect(
        screen.getByText("...screen reader and contrast checking (h4)")
      ).toBeInTheDocument();
    });
  });
});
