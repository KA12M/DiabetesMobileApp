import { createContext, useContext } from "react";
import CommonStore from "./common.store";

export const store = {
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
