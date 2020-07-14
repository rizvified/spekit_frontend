import React, { useContext, useEffect } from "react";
import { Store } from "../store";

import SearchBar from "../components/searchbar";
import Card from "../components/card";

import * as actionTypes from "../constants";
import { fetchData } from "../service";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { albums, searchQuery } = state;

  useEffect(() => {
    if (albums.length === 0) {
      const payload = fetchData();
      dispatch({
        type: actionTypes.FETCH_DATA_COMPLETE,
        payload,
      });
    }
  }, [searchQuery]);

  return (
    <>
      <header className='header'>{/* <SearchBar /> */}</header>
      <section className='album-list'>
        {/* {albums.map((album) => (
          <Card album={album} />
        ))} */}
      </section>
    </>
  );
};
