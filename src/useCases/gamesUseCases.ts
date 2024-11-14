import { APIService } from "../services/api/apiService";
import { GlobalStateService } from "../services/globalStateService";
import { JSONAPIService } from "../services/jsonApi/jsonApiService";
import {
  IFilter,
  IGameCard,
  IGameDetail,
  IGenres,
  IPlatform,
  IPlatforms,
  IScreenshot,
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
async function getTags() {
  try {
    const response: any = await APIService.getTags();
    const tagsData: ITags[] = [];
    response.results.forEach((r: any) => {
      tagsData.push({
        id: r.id,
        name: r.name,
      });
    });

    GlobalStateService.setTags(tagsData);
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
        genres: response.game.genres?.map((genre: IGenres) => ({
          id: genre.id,
          name: genre.name,
        })),
        platforms: response.game.platforms?.map((platform: IPlatforms) => ({
          platform: { id: platform.platform.id, name: platform.platform.name },
          requirements: platform.requirements,
          releasedAt: platform.releasedAt,
        })),
        rating: response.game.rating,
        releaseDate: response.game.released,
        tags: response.game.tags?.map((tag: ITags) => ({
          id: tag.id,
          name: tag.name,
        })),
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
  } catch (e) {
    console.log(e);
  }
}
async function removeFavorites(id: string) {
  try {
    await JSONAPIService.removeGameFavorite(id);
  } catch (e) {
    console.log(e);
  }
}
async function setFavorites(id: string, src: string) {
  try {
    if (src == "api") {
      const response: any = await APIService.getGameInfo(id);
      const game: IGameDetail = {
        id: response.game.id,
        title: response.game.name,
        about: response.game.description_raw,
        backgroundImage: response.game.background_image,
        genres: response.game.genres?.map((genre: IGenres) => ({
          id: genre.id,
          name: genre.name,
        })),
        platforms: response.game.platforms?.map((platform: IPlatforms) => ({
          platform: {
            id: platform.platform.id,
            name: platform.platform.name,
          },
          requirements: platform.requirements,
          releasedAt: platform.releasedAt,
        })),
        rating: response.game.rating,
        releaseDate: response.game.released,
        tags: response.game.tags?.map((tag: ITags) => ({
          id: tag.id,
          name: tag.name,
        })),
        source: "api",
        screenshots: response.screenshots?.map((s: IScreenshot) => ({
          id: s.id,
          image: s.image,
          width: s.width,
          height: s.height,
        })),
      };
      await JSONAPIService.addGameFavorite(game);
    } else if (src == "json") {
      const response = await JSONAPIService.getGameInfo(id);
      const game: IGameDetail = {
        id: response.id,
        title: response.title,
        about: response.about,
        backgroundImage: response.backgroundImage.url,
        screenshots: response.screenshots?.map((s: any) => ({
          id: s.asset_id,
          image: s.url,
          width: s.width,
          height: s.height,
        })),
        genres: response.genres?.map((genre: IGenres) => ({
          id: genre.id,
          name: genre.name,
        })),
        platforms: response.platforms?.map((platform: IPlatforms) => ({
          platform: { id: platform.platform.id, name: platform.platform.name },
          requirements: platform.requirements,
          releasedAt: platform.releasedAt,
        })),
        rating: response.rating,
        releaseDate: response.releaseDate,

        tags: response.tags?.map((tag: ITags) => ({
          id: tag.id,
          name: tag.name,
        })),
        source: "json",
      };
      await JSONAPIService.addGameFavorite(game);
    }
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
  getTags,
  setFavorites,
  removeFavorites,
};
