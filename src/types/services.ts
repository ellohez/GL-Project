// User including ID from DB
export interface User {
  username: string;
  password: string;
  id: number;
}

// NewUser with no idea - as not yet stored in DB
export interface NewUser {
  username: string;
  password: string;
}
