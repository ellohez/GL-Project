export interface UserState {
  firstName: string;
  lastName: string;
  id: number;
}

export function createInitialUserState(): UserState {
  return {
    firstName: "",
    lastName: "",
    id: -1,
  };
}
