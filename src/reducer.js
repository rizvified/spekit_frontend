import * as actionTypes from "./constants";
import {
  removeFromFavorites,
  addToArtistLookup,
  addToFavorites,
} from "./utils/normalizers";
import { saveToStorage, clearStorage } from "./utils/helpers";

export default function (state, action) {
  switch (action.type) {
    case actionTypes.RESET_SEARCH:
      return {
        ...state,
        albums: [],
      };
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
      const artistLookup = addToArtistLookup(payload, state.artistLookup);
      const { favList, favByArtistObj } = addToFavorites(
        payload,
        state.favorites,
        state.favByArtists
      );
      saveToStorage({
        favorites: favList,
        favByArtists: favByArtistObj,
        artistLookup,
      });
      return {
        ...state,
        artistLookup,
        favorites: favList,
        favByArtists: favByArtistObj,
      };
    }
    case actionTypes.REMOVE_FAVORITE: {
      const { favList, favByArtistObj, artistLookup } = removeFromFavorites(
        action.payload,
        state.favorites,
        state.artistLookup,
        state.favByArtists
      );
      saveToStorage({
        favorites: favList,
        favByArtists: favByArtistObj,
        artistLookup,
      });
      return {
        ...state,
        artistLookup,
        favorites: favList,
        favByArtists: favByArtistObj,
      };
    }
    case actionTypes.REMOVE_ALL_FAVORITES: {
      clearStorage();
      return {
        ...state,
        favorites: [],
        favByArtists: {},
        artistLookup: {},
      };
    }
    case actionTypes.UPDATE_SELECTED_ARTIST:
      return {
        ...state,
        selectedArtist: action.payload,
      };
    case actionTypes.UPDATE_DATA_FROM_STORAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
