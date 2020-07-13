import React, { useReducer, createContext } from 'react';

const initialState = {
  results: [],
  favorites: [],
  loading: false
};

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const Store = createContext();
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
