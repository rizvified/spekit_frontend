export const normalizeResponse = (data) => data;
export const filterFavorites = (id, favorites) =>
  favorites.filter((fav) => fav.id !== id);
