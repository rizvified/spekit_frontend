import React, { useReducer, createContext } from "react";
import reducer from "./reducer";

const initialState = {
  albums: [],
  favorites: {},
  favArtists: {},
  loading: false,
};

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
