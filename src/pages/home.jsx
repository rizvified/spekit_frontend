import React, { useContext } from "react";
import _ from "lodash";

import { Store } from "../store";

import SearchBar from "../components/searchbar";
import Card from "../components/card";

import * as actionTypes from "../constants";
import { getAlbumsByArtist } from "../service";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { albums } = state;

  const fetchData = async (query) => {
    if (query) {
      const payload = await getAlbumsByArtist(query);
      if (Array.isArray(payload) && payload.length > 0) {
        dispatch({
          type: actionTypes.FETCH_DATA_COMPLETE,
          payload,
        });
      }
    }
  };

  return (
    <>
      <header className='header'>
        <SearchBar fetchData={fetchData} />
      </header>
      <section className='album-list'>
        {_.map(albums, (album) => (
          <Card album={album} />
        ))}
      </section>
    </>
  );
};
