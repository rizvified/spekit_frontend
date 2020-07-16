import { normalizeResponse } from "./utils/normalizers";
import { generateURL } from "./utils/helpers";

const getAlbumsByArtist = async (query) => {
  const url = generateURL(query);
  try {
    const data = await fetch(url);
    const dataJSON = await data.json();
    const normalizedData = normalizeResponse(dataJSON);
    return normalizedData;
  } catch (e) {
    console.error("Error", e);
  }
};

export { getAlbumsByArtist };
