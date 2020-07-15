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

export const addToFavorites = (albumObj, favorites) => {
  const favoritesObj = Object.assign({}, favorites);
  const { artistId } = albumObj;
  if (!_.has(favoritesObj, artistId)) {
    favoritesObj[`${artistId}`] = [];
  }
  favoritesObj[`${artistId}`].push(albumObj);
  return favoritesObj;
};

export const removeFromFavorites = (albumObj, favorites, favArtists) => {
  const favoritesObj = Object.assign({}, favorites);
  let lookupObj = Object.assign({}, favArtists);
  const { id, artistId } = albumObj;
  if (_.has(favoritesObj, artistId)) {
    favoritesObj[`${artistId}`] = _.filter(
      favoritesObj[`${artistId}`],
      (item) => item.id !== id
    );
    if (favoritesObj[`${artistId}`].length === 0) {
      lookupObj = removeFromArtistLookup(albumObj, lookupObj);
      _.omit(favoritesObj, `${artistId}`);
    }
  }

  return {
    favoritesObj,
    lookupObj,
  };
};
