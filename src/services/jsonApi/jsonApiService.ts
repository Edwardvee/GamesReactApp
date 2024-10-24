import { IGameDetail } from "../../types";
import { jsonAxiosInstance } from "./jsonAxiosInstance";

async function getGames(param: string) {
  try {
    const { data } = await jsonAxiosInstance.get("/games", {
      params: { _page: param, _per_page: 10 },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getItems() {
  try {
    const { data } = await jsonAxiosInstance.get("/games", {
      params: { _page: 1 },
    });
    return data.items;
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
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function addGameFavorite(game: IGameDetail) {
  try {
    const { data } = await jsonAxiosInstance.post("/your-library/", game);
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
  getItems,
};
