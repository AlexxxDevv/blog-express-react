export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  media: string;
  owner: User;
}

export type AuthRespons = {
  token: string;
  user: User;
}
