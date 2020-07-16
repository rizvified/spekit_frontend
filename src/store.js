import React, { useReducer, createContext } from "react";
import reducer from "./reducer";

export const initialState = {
  albums: [],
  favorites: [],
  favoritesID: [],
  favByArtists: {},
  artistLookup: {},
  selectedArtist: "",
};

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
