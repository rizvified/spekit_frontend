import CryptoJS from "crypto-js";
import _ from "lodash";
import qs from "qs";

import {
  API_URL,
  SEARCH_ENTITY,
  ARTWORK_DIMENSIONS,
  QUERY_LIMIT,
  STORAGE_KEY,
  ENCRYPTION_KEY,
} from "../constants";

const storageUtils = {
  get: (key) => localStorage.getItem(key),
  save: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
};

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

export const saveToStorage = (data) => {
  let dataToSave = Object.assign({}, data);
  if (_.has(localStorage, STORAGE_KEY)) {
    storageUtils.remove(STORAGE_KEY);
  }
  dataToSave = JSON.stringify(dataToSave);
  dataToSave = CryptoJS.AES.encrypt(dataToSave, ENCRYPTION_KEY).toString();
  storageUtils.save(STORAGE_KEY, dataToSave);
};

export const retrieveFromStorage = () => {
  let storageValues = {};
  if (_.has(localStorage, STORAGE_KEY)) {
    const dataInStorage = storageUtils.get(STORAGE_KEY).toString();
    const bytes = CryptoJS.AES.decrypt(dataInStorage, ENCRYPTION_KEY);
    storageValues = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return storageValues;
};

export const clearStorage = () => {
  if (_.has(localStorage, STORAGE_KEY)) {
    storageUtils.remove(STORAGE_KEY);
  }
};
