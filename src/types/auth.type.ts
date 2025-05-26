export type UserRequest = {
  username: string;
  password: string;
};

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  token: string;
};
