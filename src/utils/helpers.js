import qs from "qs";

import { API_URL, SEARCH_ENTITY } from "../constants";

export const generateURL = (searchQuery) => {
  const params = {
    term: searchQuery,
    entity: SEARCH_ENTITY,
  };
  const generatedURL = `${API_URL}/search?${qs.stringify(params)}`;
  return generatedURL;
};
