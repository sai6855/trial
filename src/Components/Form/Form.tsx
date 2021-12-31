import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
//import FileBase from "react-file-base64";

import useStyles from "./styles";
import useApi from "../../actions/posts";
import useContext from "../../Store/useStoreContext";
import { Post } from "../../types";

const Form = ({
  setCurrentId,
}: {
  setCurrentId: (id: string | null) => void;
}) => {
  const [postData, setPostData] = useState<Post>({
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    _id: "",
    likeCount: 0,
  });

  const { state } = useContext();

  const { createPost, updatePost } = useApi();

  const posts = state.store.posts;
  const currentId = state.store.currentId;

  const classes = useStyles();

  useEffect(() => {
    setPostData(
      currentId
        ? (posts.find((post) => post._id === currentId) as Post)
        : {
            creator: "",
            title: "",
            message: "",
            tags: [],
            selectedFile: "",
            _id: "",
            likeCount: 0,
          }
    );
  }, [currentId, posts]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
      _id: "",
      likeCount: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentId === null) {
      createPost(postData);
      clear();
    } else {
      updatePost(currentId, postData);
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${postData.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          {/* <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          /> */}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
