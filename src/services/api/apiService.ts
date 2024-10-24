import { IFilter } from "../../types";
import { axiosInstance } from "./axiosInstance";

async function getGames(
  page: number,
  filter: IFilter,
  genres?: string,
  platforms?: string
) {
  try {
    const params: any = { page: page, [filter.param]: filter.value };
    if (genres) {
      params.genres = genres;
    }
    if (platforms) {
      params.platforms = platforms;
    }

    const { data } = await axiosInstance.get("/games", {
      params,
    });
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getGenres() {
  try {
    const { data } = await axiosInstance.get("/genres");
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getTags() {
  try {
    const { data } = await axiosInstance.get("/tags");
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getPlatforms() {
  try {
    const [pageOne, pageTwo] = await Promise.all([
      axiosInstance.get("/platforms"),
      axiosInstance.get("/platforms?page=2"),
    ]);
    const data = [...pageOne.data.results, ...pageTwo.data.results];

    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getGameInfo(game: string) {
  try {
    const [gameid, screenshots] = await Promise.all([
      axiosInstance.get("/games/" + game),
      axiosInstance.get("/games/" + game + "/screenshots"),
    ]);
    const data = { game: gameid.data, screenshots: screenshots.data.results };
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export const APIService = {
  getGames,
  getGameInfo,
  getGenres,
  getPlatforms,
};
