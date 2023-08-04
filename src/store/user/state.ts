export interface UserState {
  firstName: string;
  lastName: string;
  signUpComplete: boolean;
  id: number;
}

export function createInitialUserState(): UserState {
  return {
    firstName: "",
    lastName: "",
    signUpComplete: false,
    id: -1,
  };
}
