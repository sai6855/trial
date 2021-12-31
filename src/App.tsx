import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from "./Components/Posts/Posts";
import Form from "./Components/Form/Form";
import useStyles from "./styles";
import useContext from "./Store/useStoreContext";
import useApi from "./actions/posts";

const App = () => {
  const classes = useStyles();

  const { state, setState } = useContext();

  const setCurrentId = (id: string | null) => setState(id, "store.currentId");

  const { getPosts } = useApi();
  console.log(state);
  useEffect(() => {
    getPosts();
  }, [state.store.posts.length, getPosts]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src="/memories.png"
          alt="icon"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
