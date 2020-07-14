import _ from "lodash";

export const normalizeResponse = (data) =>
  _.map(data.results, (item) => ({
    id: item.collectionId,
    name: item.collectionName,
    artist: item.artistName,
    genre: item.primaryGenreName,
    tracks: item.trackCount,
    artwork: item.artworkUrl100,
  }));

export const filterFavorites = (id, favorites) =>
  _.filter(favorites, (fav) => fav.id !== id);
