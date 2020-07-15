import * as actionTypes from "./constants";
import {
  removeFromFavorites,
  addToArtistLookup,
  addToFavorites,
} from "./utils/normalizers";

export default function (state, action) {
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_DATA_COMPLETE:
      return {
        ...state,
        loading: false,
        albums: action.payload,
      };
    case actionTypes.ADD_FAVORITE:
      const { payload } = action;
      const artistLookup = addToArtistLookup(payload, state.favArtists);
      const favAlbumsList = addToFavorites(payload, state.favorites);
      return {
        ...state,
        favArtists: artistLookup,
        favorites: favAlbumsList,
      };
    case actionTypes.REMOVE_FAVORITE:
      const { favoritesObj, lookupObj } = removeFromFavorites(
        action.payload,
        state.favorites,
        state.favArtists
      );
      return {
        ...state,
        favArtists: lookupObj,
        favorites: favoritesObj,
      };
    default:
      return state;
  }
}
