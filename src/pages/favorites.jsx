import React, { useContext, useEffect } from "react";
import Select from "react-select";
import _ from "lodash";

import Card from "../components/card";

import * as actionTypes from "../constants";
import { Store } from "../store";
import { normalizeDropdownData } from "../utils/normalizers";
import { retrieveFromStorage } from "../utils/helpers";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { favorites, artistLookup, favByArtists, selectedArtist } = state;

  useEffect(() => {
    const data = retrieveFromStorage();
    if (!_.isEmpty(data)) {
      dispatch({
        type: actionTypes.UPDATE_DATA_FROM_STORAGE,
        payload: data,
      });
    }
  }, []);

  const handleArtistChange = (artist) => {
    const payload = artist ? artist.value : "";
    dispatch({
      type: actionTypes.UPDATE_SELECTED_ARTIST,
      payload,
    });
  };

  const handleRemoveFavorite = (album) => {
    dispatch({
      type: actionTypes.REMOVE_FAVORITE,
      payload: album,
    });
  };

  const handleRemoveAll = () => {
    dispatch({
      type: actionTypes.REMOVE_ALL_FAVORITES,
    });
  };

  const list = selectedArtist ? favByArtists[`${selectedArtist}`] : favorites;

  return (
    <>
      <header className='header'>
        <Select
          value={artistLookup.selectedArtist}
          onChange={handleArtistChange}
          options={normalizeDropdownData(artistLookup)}
          isClearable
          isSearchable
        />
        <button onClick={handleRemoveAll}>Remove All</button>
      </header>
      <section className='fav-list'>
        {_.map(list, (album) => (
          <Card album={album} clickHandler={handleRemoveFavorite} />
        ))}
      </section>
    </>
  );
};
