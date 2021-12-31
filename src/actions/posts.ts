import { useCallback, useContext } from "react";
import * as api from "../api/index";
import { Context } from "../Store/StoreContext";
import { Post } from "../types";

const useApi = () => {
  const { setState } = useContext(Context);

  const getPosts = useCallback(async () => {
    try {
      const data = await api.fetchPosts();

      setState(() => data, "store.posts");
    } catch (error) {
      console.log(error);
    }
  }, [setState]);

  const createPost = async (post: Post) => {
    try {
      const data = await api.createPost(post);
      setState((posts) => {
        return [...posts, data];
      }, "store.posts");
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id: string, newpost: Post) => {
    try {
      const data = await api.updatePost(id, newpost);

      setState(
        (store) => ({
          ...store,
          posts: store.posts.map((post) =>
            post._id === id ? { ...data, ...newpost } : post
          ),
          currentId: null,
        }),
        "store"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id: string) => {
    console.log(`Like ${id}`);
    try {
      const data = await api.likePost(id);

      setState(
        (posts) => posts.map((post) => (post._id === id ? data : post)),
        "store.posts"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.deletePost(id);

      setState((state) => {
        return {
          ...state,
          currentId: null,
          posts: state.posts.filter((post) => post._id !== id),
        };
      }, "store");
    } catch (error) {
      console.log(error);
    }
  };

  return { deletePost, getPosts, updatePost, createPost, likePost };
};

export default useApi;
