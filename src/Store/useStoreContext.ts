import React from "react";
import { Context } from "./StoreContext";

const useContext = () => {
  const { state, setState } = React.useContext(Context);

  return { setState, state };
};

export default useContext;
