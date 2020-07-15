import qs from "qs";

import {
  API_URL,
  SEARCH_ENTITY,
  ARTWORK_DIMENSIONS,
  QUERY_LIMIT,
} from "../constants";

export const generateURL = (searchQuery) => {
  const params = {
    term: searchQuery,
    entity: SEARCH_ENTITY,
    limit: QUERY_LIMIT,
  };
  const generatedURL = `${API_URL}/search?${qs.stringify(params)}`;
  return generatedURL;
};

export const generateImageURL = (imageURL) => {
  const identifier = imageURL.indexOf("source");
  const slicedURL = imageURL.slice(0, identifier + 7);
  const dimensions = `${ARTWORK_DIMENSIONS.width}x${ARTWORK_DIMENSIONS.height}`;
  const newURL = `${slicedURL}${dimensions}.jpg`;
  return newURL;
};
