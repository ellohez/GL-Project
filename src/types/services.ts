// User including ID from DB
export interface User {
  email: string;
  id: number;
}

// NewUser with no idea - as not yet stored in DB
export interface NewUser {
  email: string;
  password: string;
}
