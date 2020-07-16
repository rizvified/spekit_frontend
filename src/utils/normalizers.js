/*

General purpose normalizer functions

*/

import _ from "lodash";
import { generateImageURL } from "./helpers";

// Transforms API response object
export const normalizeResponse = (data) =>
  _.map(data.results, (item) => ({
    id: item.collectionId,
    name: item.collectionName,
    artist: item.artistName,
    artistId: item.artistId,
    genre: item.primaryGenreName,
    tracks: item.trackCount,
    artwork: generateImageURL(item.artworkUrl100),
  }));

// Add new entry into lookup, useful for filtering favorites by artists
export const addToArtistLookup = (albumObj, favArtists) => {
  let lookupObj = Object.assign({}, favArtists);
  const { artist, artistId } = albumObj;
  if (!_.has(lookupObj, artistId)) {
    lookupObj[`${artistId}`] = artist;
  }
  return lookupObj;
};

// Removes key value pair from lookup provided.
export const removeFromArtistLookup = (albumObj, favArtists) => {
  let lookupObj = Object.assign({}, favArtists);
  const { artistId } = albumObj;
  if (_.has(lookupObj, artistId)) {
    _.omit(lookupObj, `${artistId}`);
  }
  return lookupObj;
};

//
export const addToFavorites = (
  albumObj,
  favorites,
  favByArtists,
  favoritesID
) => {
  const favList = [...favorites];
  const favIDList = [...favoritesID];
  const favByArtistObj = Object.assign({}, favByArtists);
  const { id, artistId } = albumObj;
  if (!_.has(favByArtistObj, artistId)) {
    favByArtistObj[`${artistId}`] = [];
  }
  // Adds album to favorites list and favorite ID list
  favList.push(albumObj);
  favIDList.push(id);
  // Creating a map of favorites against artist ID, useful for quick access
  // of favorites against artists
  favByArtistObj[`${artistId}`].push(albumObj);
  return { favList, favByArtistObj, favIDList };
};

// Removes a favorite album alongside, album ID form album ID list
// and artist from artist lookup
export const removeFromFavorites = (
  albumObj,
  favorites,
  favArtists,
  favByArtists,
  favoritesID
) => {
  const favByArtistObj = Object.assign({}, favByArtists);
  let artistLookup = Object.assign({}, favArtists);
  const { id, artistId } = albumObj;

  // Removing album from favorites list
  const favList = _.filter(favorites, (item) => item.id !== id);
  // Removing album from album ID list
  const favIDList = _.filter(favoritesID, (item) => item !== id);
  // Checking if our artistID -> albums map contains the artist of the incoming album
  if (_.has(favByArtistObj, artistId)) {
    // Removes the selected album from the list
    favByArtistObj[`${artistId}`] = _.filter(
      favByArtistObj[`${artistId}`],
      (item) => item.id !== id
    );
    // If the list is empty, remove the artist from the lookup since no entries
    // against that artist ID exist anymore
    if (favByArtistObj[`${artistId}`].length === 0) {
      artistLookup = removeFromArtistLookup(albumObj, artistLookup);
      // Also remove artistID key from artistID -> albums map
      _.omit(favByArtistObj, `${artistId}`);
    }
  }

  return {
    favList,
    favByArtistObj,
    artistLookup,
    favIDList,
  };
};
// Turns artist lookup into object { label, value }
// Used for displaying entries in dropdown in favorites section
export const normalizeDropdownData = (data) =>
  _.map(data, (label, value) => ({
    value,
    label,
  }));
