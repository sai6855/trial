import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./styles";
import useContext from "../../Store/useStoreContext";

const Posts = ({
  setCurrentId,
}: {
  setCurrentId: (id: string | null) => void;
}) => {
  const { state } = useContext();
  const posts = state.store.posts;
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
