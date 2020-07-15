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
    case actionTypes.ADD_FAVORITE: {
      const { payload } = action;
      const artistLookup = addToArtistLookup(payload, state.favArtists);
      const { favList, favByArtistObj } = addToFavorites(
        payload,
        state.favorites,
        state.favByArtists
      );
      return {
        ...state,
        favArtists: artistLookup,
        favorites: favList,
        favByArtists: favByArtistObj,
      };
    }
    case actionTypes.REMOVE_FAVORITE: {
      const { favList, favByArtistObj, lookupObj } = removeFromFavorites(
        action.payload,
        state.favorites,
        state.favArtists,
        state.favByArtists
      );
      return {
        ...state,
        favArtists: lookupObj,
        favorites: favList,
        favByArtists: favByArtistObj,
      };
    }
    case actionTypes.UPDATE_SELECTED_ARTIST:
      return {
        ...state,
        selectedArtist: action.payload,
      };
    default:
      return state;
  }
}
