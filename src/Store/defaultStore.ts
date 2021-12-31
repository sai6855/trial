import { Post } from "../types";

type DefaultState = {
  posts: Post[];
  currentId: string | null;
};

export const defaultStore: DefaultState = {
  posts: [],
  currentId: null,
};
