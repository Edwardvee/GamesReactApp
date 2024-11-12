import { IGameDetail } from "../../types";
import { jsonAxiosInstance } from "./jsonAxiosInstance";

async function getGames(page: number) {
  try {
    const { data } = await jsonAxiosInstance.get("/games", {
      params: { _page: page, _per_page: 10 },
    });

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function getFavorites() {
  try {
    const { data } = await jsonAxiosInstance.get("/your-library");
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function createGame(game: IGameDetail) {
  try {
    const { data } = await jsonAxiosInstance.post("/games/", game);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function addGameFavorite(game: IGameDetail) {
  try {
    const { data } = await jsonAxiosInstance.post("/your-library/", game);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getGameInfo(id: string) {
  try {
    const { data } = await jsonAxiosInstance.get("/games/" + id);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const JSONAPIService = {
  getGames,
  addGameFavorite,
  createGame,
  getFavorites,
  getGameInfo,
};
