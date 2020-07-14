import { normalizeResponse } from "./utils/normalizers";
import { generateURL } from "./utils/helpers";

export const getAlbumsByArtist = async (query) => {
  try {
    const url = generateURL(query);
    const data = await fetch(url);
    const dataJSON = await data.json();
    const normalizedData = normalizeResponse(dataJSON);
    return normalizedData;
  } catch (e) {
    console.error("Error", e);
  }
};

export default {
  getAlbumsByArtist,
};
