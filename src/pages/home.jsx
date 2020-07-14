import React, { useContext, useEffect, useCallback } from "react";
import { Store } from "../store";

import SearchBar from "../components/searchbar";
import Card from "../components/card";

import * as actionTypes from "../constants";
import { getAlbumsByArtist } from "../service";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { albums, searchQuery } = state;

  // Dispatch doesn't need to change on every render
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    const fetchDataAction = async () => {
      const payload = await getAlbumsByArtist();
      stableDispatch({
        type: actionTypes.FETCH_DATA_COMPLETE,
        payload,
      });
    };
    fetchDataAction();
  }, [stableDispatch, searchQuery]);

  const updateSearchQuery = (query) =>
    stableDispatch({
      type: actionTypes.UPDATE_QUERY,
      payload: query,
    });

  return (
    <>
      <header className='header'>
        <SearchBar onChange={updateSearchQuery} />
      </header>
      <section className='album-list'>
        {albums.map((album) => (
          <Card album={album} />
        ))}
      </section>
    </>
  );
};
