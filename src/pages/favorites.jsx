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
    // Retrieves stored favorites from local storage, if any
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

  // Displays favorites by arists if any artist is selected, default to all favorites
  const list = selectedArtist ? favByArtists[`${selectedArtist}`] : favorites;

  return (
    <>
      <header className='header-favorites'>
        <Select
          className='favorite-select'
          value={artistLookup.selectedArtist}
          onChange={handleArtistChange}
          options={normalizeDropdownData(artistLookup)}
          isClearable
          isSearchable
        />
        <div className='favorite-btn'>
          <button onClick={handleRemoveAll}>Remove All</button>
        </div>
      </header>
      <main className='favorite-list'>
        {list.length === 0 ? (
          <div className='favorite-text'>
            <h2>Oops, you have no favorites</h2>
          </div>
        ) : (
          _.map(list, (album) => (
            <Card album={album} clickHandler={handleRemoveFavorite} removeFav />
          ))
        )}
      </main>
    </>
  );
};
