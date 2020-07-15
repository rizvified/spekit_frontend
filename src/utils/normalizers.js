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

export const filterFavorites = (id, favorites) =>
  _.filter(favorites, (fav) => fav.id !== id);
