import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";

import Select from "../components/select";
import Card from "../components/card";

import { Store } from "../store";
import * as actionTypes from "../constants";

export default () => {
  const { state, dispatch } = useContext(Store);
  const { favorites, favArtists } = state;

  const [selectedArtist, updateSelectedArtist] = useState("");

  const handleChange = (artist) => {
    updateSelectedArtist(artist);
  };

  const list = selectedArtist ? favorites.selectedArtist : favorites;
  return (
    <>
      <header className='header'>
        <Select onChange={handleChange} options={favArtists} />
      </header>
      <section className='fav-list'>
        {_.map(list, (album) => (
          <Card album={album} />
        ))}
      </section>
    </>
  );
};
