import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import SearchBar from "../components/searchbar";
import Card from "../components/card";

import * as actionTypes from "../constants";
import { Store } from "../store";
import { getAlbumsByArtist } from "../service";
import { controller } from "../service";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { albums } = state;

  useEffect(() => {
    dispatch({
      type: actionTypes.RESET_STATE,
    });

    // Cancel data fetching on page change.
    return () => {
      controller.abort();
    };
  }, []);

  const fetchData = async (query) => {
    const payload = await getAlbumsByArtist(query);
    if (Array.isArray(payload) && payload.length > 0) {
      dispatch({
        type: actionTypes.FETCH_DATA_COMPLETE,
        payload,
      });
    }
  };

  const handleAddFavorite = (album) => {
    dispatch({
      type: actionTypes.ADD_FAVORITE,
      payload: album,
    });
  };

  return (
    <>
      <header className='header'>
        <SearchBar fetchData={fetchData} />
        <Link to='/favorites'>Favorites</Link>
      </header>
      <section className='album-list'>
        {_.map(albums, (album) => (
          <Card album={album} clickHandler={handleAddFavorite} />
        ))}
      </section>
    </>
  );
};
