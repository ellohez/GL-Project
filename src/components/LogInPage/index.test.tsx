import { fireEvent, screen } from "@testing-library/react";

import LogInPage from ".";
import { renderComponent } from "../../../test/helpers/render";

describe("User Page", () => {
  describe("render", () => {
    it("renders how we'd expect", () => {
      renderComponent(<LogInPage />);

      expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
      expect(screen.getByLabelText("Your password:")).toBeInTheDocument();
    });
  });

  // describe("interact", () => {
  //   it("submitting the form triggers a 'setUsername' action", () => {
  //     const { store } = renderComponent(<LogInPage />);
  //     const actionSpy = jest.spyOn(store, "dispatch");

  //     fireEvent.input(screen.getByLabelText("Your first name:"), {
  //       target: { value: "Marco" },
  //     });
  //     fireEvent.input(screen.getByLabelText("Your last name:"), {
  //       target: { value: "Polo" },
  //     });
  //     fireEvent.click(screen.getByText("SUBMIT"));

  //     expect(actionSpy).toBeCalledWith({
  //       type: "user/setUserFirstName",
  //       payload: "Marco",
  //     });

  //     expect(actionSpy).toBeCalledWith({
  //       type: "user/setUserLastName",
  //       payload: "Polo",
  //     });
  //   });
  // });
});
