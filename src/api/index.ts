import { nanoid } from "nanoid";
import { Post } from "../types";

export const fetchPosts = () =>
  new Promise((resolve: (value: Post[]) => void, reject) => {
    setTimeout(() => {
      const posts = localStorage.getItem("posts");
      resolve(posts ? JSON.parse(posts) : []);
    }, 1000);
  });
export const createPost = (newPost: Post) =>
  new Promise((resolve: (value: Post) => void, reject) => {
    setTimeout(() => {
      const prevPosts: Post[] = localStorage.getItem("posts")
        ? JSON.parse(localStorage.getItem("posts") as string)
        : [];
      const modNewPost = { ...newPost, likeCount: 0, _id: nanoid() };
      localStorage.setItem("posts", JSON.stringify([...prevPosts, modNewPost]));
      resolve(modNewPost);
    }, 1000);
  });
export const likePost = (id: string) =>
  new Promise((resolve: (value: Post) => void, reject) => {
    setTimeout(() => {
      const prevPosts: Post[] = JSON.parse(
        localStorage.getItem("posts") as string
      );

      const newPosts = prevPosts.map((post) =>
        post._id === id ? { ...post, likeCount: post.likeCount + 1 } : post
      );

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts.find((post) => post._id === id) as Post);
    }, 1000);
  });
export const updatePost = (id: string, updatedPost: Post) =>
  new Promise((resolve: (value: Post[]) => void, reject) => {
    setTimeout(() => {
      const prevPosts: Post[] = JSON.parse(
        localStorage.getItem("posts") as string
      );

      const newPosts = prevPosts.map((post) =>
        post._id === id ? updatedPost : post
      );

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts);
    }, 1000);
  });
export const deletePost = (id: string) =>
  new Promise((resolve: (value: Post[]) => void, reject) => {
    setTimeout(() => {
      const prevPosts: Post[] = JSON.parse(
        localStorage.getItem("posts") as string
      );

      const newPosts = prevPosts.filter((post) => post._id !== id);

      localStorage.setItem("posts", JSON.stringify(newPosts));
      resolve(newPosts);
    }, 1000);
  });
