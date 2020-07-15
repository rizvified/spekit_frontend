import * as actionTypes from "./constants";
import { filterFavorites } from "./utils/normalizers";

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
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case actionTypes.REMOVE_FAVORITE:
      const filteredFav = filterFavorites(action.payload, state.favorites);
      return {
        ...state,
        favorites: filteredFav,
      };
    default:
      return state;
  }
}
