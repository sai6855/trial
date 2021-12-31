import React from "react";
import { createContext, useProvider } from "react-manage-state";
import { defaultStore } from "./defaultStore";

export const Context = createContext(defaultStore);

const Provider: React.FC = ({ children }) => {
  const { state, setState } = useProvider(defaultStore);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export default Provider;
