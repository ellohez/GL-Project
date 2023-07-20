import { fireEvent, screen, waitFor } from "@testing-library/react";

import UsernamePage from ".";
import { renderComponent } from "../../../../test/helpers/render";
import { formTitles } from "../../SignUpPage/index";

describe("Username Page", () => {
  const id = formTitles[1];
  describe("Todo tests", () => {
    // Can the validation messages be tested here? Not sure the child component is rendered.
    it.todo("Should initally load with 3 'isError' validation messages");
    it.todo("Should initially include a cross mark on each validation message");
    it.todo(
      "Should include 3 non 'isError' validation messages when a valid email is entered"
    );
    it.todo(
      "Should show a tick mark on each validation message when a valid email is entered"
    );

    it.todo(
      "Should enable the next button when a valid email is entered: test@test.co.uk"
    );
    it.todo(
      "Should not enable the next button if the email does not contain an @ symbol"
    );
  });

  describe("renders as we'd expect", () => {
    it("contains the title and input", () => {
      renderComponent(<UsernamePage id={id} />);

      expect(screen.findByText("Your email address"));
      expect(screen.getByTestId("email")).toBeInTheDocument();
      // Cannot test the output of error messages - this is tested in <ValidationChecklist />
    });
  });

  describe("interaction with store", () => {
    it("should update the store with the email", () => {
      const { store } = renderComponent(<UsernamePage id={id} />);
      fireEvent.input(screen.getByTestId("email"), {
        target: { value: "test@test.com" },
      });
      const selectEmail = store.getState().newUser.email;
      expect(selectEmail).toBe("test@test.com");
    });

    // it("should update the isValid flag in the store", () => {
    //   const { store } = renderComponent(<UsernamePage id={id} />);

    //   fireEvent.input(screen.getByTestId("email"), {
    //     target: { value: "test@test.com" },
    //   });

    //   // waitFor(expect(store.getState().signUpPages.pages[1]).toBeDefined);
    //   // const selectIsValid = store.getState().signUpPages.pages[1].isValid;
    //   // expect(selectIsValid).toBe(true);
    //   const updatedState = store.getState();
    //   expect(updatedState.signUpPages.pages[1]).toEqual(true);
    // });
  });
});
