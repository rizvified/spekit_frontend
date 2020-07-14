import { API_URL } from "./constants";
import { normalizeResponse } from "./normalizers";

export const fetchData = async () => {
  try {
    const data = await fetch(API_URL);
    const dataJSON = await data.json();
    const normalizedData = normalizeResponse(dataJSON);
    return normalizedData;
  } catch (e) {
    console.error("Error", e);
  }
};

export default {
  fetchData,
};
