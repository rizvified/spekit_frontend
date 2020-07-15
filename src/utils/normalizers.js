import _ from "lodash";
import { generateImageURL } from "./helpers";

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

export const addToArtistLookup = (albumObj, favArtists) => {
  let lookupObj = Object.assign({}, favArtists);
  const { artist, artistId } = albumObj;
  if (!_.has(lookupObj, artistId)) {
    lookupObj[`${artistId}`] = artist;
  }
  return lookupObj;
};

export const removeFromArtistLookup = (albumObj, favArtists) => {
  let lookupObj = Object.assign({}, favArtists);
  const { artistId } = albumObj;
  if (_.has(lookupObj, artistId)) {
    _.omit(lookupObj, `${artistId}`);
  }
  return lookupObj;
};

export const addToFavorites = (albumObj, favorites, favByArtists) => {
  const favList = [...favorites];
  const favByArtistObj = Object.assign({}, favByArtists);
  const { artistId } = albumObj;
  if (!_.has(favByArtistObj, artistId)) {
    favByArtistObj[`${artistId}`] = [];
  }
  favList.push(albumObj);
  favByArtistObj[`${artistId}`].push(albumObj);
  return { favList, favByArtistObj };
};

export const removeFromFavorites = (
  albumObj,
  favorites,
  favArtists,
  favByArtists
) => {
  const favByArtistObj = Object.assign({}, favByArtists);
  let artistLookup = Object.assign({}, favArtists);
  const { id, artistId } = albumObj;

  const favList = _.filter(favorites, (item) => item.id !== id);
  if (_.has(favByArtistObj, artistId)) {
    favByArtistObj[`${artistId}`] = _.filter(
      favByArtistObj[`${artistId}`],
      (item) => item.id !== id
    );
    if (favByArtistObj[`${artistId}`].length === 0) {
      artistLookup = removeFromArtistLookup(albumObj, artistLookup);
      _.omit(favByArtistObj, `${artistId}`);
    }
  }

  return {
    favList,
    favByArtistObj,
    artistLookup,
  };
};

export const normalizeDropdownData = (data) =>
  _.map(data, (label, value) => ({
    value,
    label,
  }));
