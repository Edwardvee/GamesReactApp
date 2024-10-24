import { APIService } from "../services/api/apiService";
import { GlobalStateService } from "../services/globalStateService";
import {
  IFilter,
  IGameCard,
  IGameDetail,
  IPlatform,
  IScreenshot,
  IScreenshots,
  ITags,
} from "../types";
async function getGames(
  page: number,
  filter: IFilter,
  genres?: string,
  platforms?: string
) {
  try {
    const response = await APIService.getGames(page, filter, genres, platforms);
    const gamesData: IGameCard[] = [];
    response.results.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.name,
        genres: r.genres,
        image: r.background_image,
        platforms: r.platforms,
        releaseDate: r.released,
        source: "api",
      });
    });
    GlobalStateService.setGames(gamesData);
  } catch (e) {
    console.log(e);
  }
}
async function getGenres() {
  try {
    const response = await APIService.getGenres();
    const genresData: ITags[] = [];
    response.results.forEach((response: any) => {
      genresData.push({
        id: response.id,
        name: response.name,
      });
    });
    GlobalStateService.setGenres(genresData);
    console.log(genresData);
  } catch (e) {
    console.log(e);
  }
}
async function getDiscoverGames(page: number, filter: IFilter) {
  try {
    const response = await APIService.getGames(page, filter);
    const gamesData: IGameCard[] = [];

    response.results.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.name,
        genres: r.genres,
        image: r.background_image,
        platforms: r.platforms,
        releaseDate: r.released,
        source: "api",
      });
    });
    GlobalStateService.setDiscoverGames(gamesData);
  } catch (e) {
    console.log(e);
  }
}
async function getPlatforms() {
  try {
    const response: any = await APIService.getPlatforms();
    const platformsData: IPlatform[] = [];
    response.forEach((r: any) => {
      platformsData.push({
        id: r.id,
        name: r.name,
      });
    });
    GlobalStateService.setPlatforms(platformsData);
  } catch (e) {
    console.log(e);
  }
}
async function getGameInfo(game: string) {
  try {
    const response: any = await APIService.getGameInfo(game);
    const gameData: IGameDetail[] = [
      {
        id: response.game.id,
        title: response.game.name,
        about: response.game.description_raw,
        backgroundImage: response.game.background_image,
        genres: response.game.genres,
        platforms: response.game.platforms,
        rating: response.game.rating,
        releaseDate: response.game.released,
        tags: response.game.tags,
        source: "api",
        screenshots: response.screenshots?.map((s: IScreenshot) => ({
          id: s.id,
          image: s.image,
          width: s.width,
          height: s.height,
        })),
      },
    ];
    GlobalStateService.setGameInfo(gameData);
    console.log(gameData);
  } catch (e) {
    console.log(e);
  }
}

export const GamesUseCases = {
  getGames,
  getGameInfo,
  getDiscoverGames,
  getGenres,
  getPlatforms,
};
