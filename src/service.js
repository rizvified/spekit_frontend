import { normalizeResponse } from "./utils/normalizers";
import { generateURL } from "./utils/helpers";

const controller = new AbortController();
const signal = controller.signal;

const getAlbumsByArtist = async (query) => {
  try {
    const url = generateURL(query);
    const data = await fetch(url, {
      method: "get",
      signal: signal,
    });
    const dataJSON = await data.json();
    const normalizedData = normalizeResponse(dataJSON);
    return normalizedData;
  } catch (e) {
    console.error("Error", e);
  }
};

export { getAlbumsByArtist, controller };
