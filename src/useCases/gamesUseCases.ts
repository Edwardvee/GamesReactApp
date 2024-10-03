import { APIService } from "../services/api/apiService";
import { GlobalStateService } from "../services/globalStateService";
import { IGameDetail, IGameCard } from "../types";

async function getGames(params: string) {
  try {
    const response = await APIService.getGames(params);
    const gamesData: IGameCard[] = [];
    response.results.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.name,
        genres: r.genres,
        image: r.background_image,
        platforms: r.platforms,
        releaseDate: r.released,
      });
    });
    console.log(gamesData);
    GlobalStateService.setGames(gamesData);
  } catch (e) {
    console.log(e);
  }
}

async function getDiscoverGames(params: string) {
  try {
    const response = await APIService.getGames(params);
    const gamesData: IGameCard[] = [];
    response.results.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.name,
        genres: r.genres,
        image: r.background_image,
        platforms: r.platforms,
        releaseDate: r.released,
      });
    });
    GlobalStateService.setDiscoverGames(gamesData);
  } catch (e) {
    console.log(e);
  }
}

async function getGameInfo(game: string) {
  try {
    const response = await APIService.getGameInfo(game);
    const gameData: IGameDetail[] = [
      {
        id: response.id,
        title: response.name,
        about: response.description_raw,
        backgroundImage: response.background_image,
        genre: response.genres,
        platforms: response.platforms,
        rating: response.rating,
        releaseDate: response.released,
        tags: response.tags,
      },
    ];
    GlobalStateService.setGameInfo(gameData);
  } catch (e) {
    console.log(e);
  }
}

export const GamesUseCases = {
  getGames,
  getGameInfo,
  getDiscoverGames,
};
