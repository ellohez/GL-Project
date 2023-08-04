import { createTestStore } from "../../../test/helpers/store";
import { setUserFirstName, setUserLastName } from "./userSlice";

describe("userSlice", () => {
  describe("setUsername", () => {
    it("updates the username in the store", () => {
      const testStore = createTestStore();

      testStore.dispatch(setUserFirstName("John"));
      testStore.dispatch(setUserLastName("Smith"));

      const updatedState = testStore.getState();

      expect(updatedState.user).toEqual({
        firstName: "John",
        lastName: "Smith",
        id: -1,
        signUpComplete: false,
      });
    });
  });
});
