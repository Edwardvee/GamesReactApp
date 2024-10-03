import { axiosInstance } from "./axiosInstance";

async function getGames(params: string) {
  try {
    const { data } = await axiosInstance.get("/games?" + params + "&");
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getGameInfo(game: string) {
  try {
    const { data } = await axiosInstance.get("/games/" + game);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const APIService = {
  getGames,
  getGameInfo,
};
