import React, { useContext } from "react";
import Select from "react-select";
import _ from "lodash";

import Card from "../components/card";

import { Store } from "../store";
import * as actionTypes from "../constants";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { favorites, favArtists, selectedArtist } = state;

  const handleArtistChange = (artist) => {
    dispatch({
      type: actionTypes.UPDATE_SELECTED_ARTIST,
      payload: artist,
    });
  };

  const handleRemoveFavorite = (album) => {
    dispatch({
      type: actionTypes.REMOVE_FAVORITE,
      payload: album,
    });
  };

  const list = selectedArtist ? favorites.selectedArtist : favorites;
  console.log("favorites", favorites, favArtists, selectedArtist, list);

  return (
    <>
      <header className='header'>
        <Select
          value={favArtists.selectedArtist}
          onChange={handleArtistChange}
          options={favArtists}
        />
      </header>
      <section className='fav-list'>
        {_.map(list, (album) => (
          <Card album={album} clickHandler={handleRemoveFavorite} />
        ))}
      </section>
    </>
  );
};
