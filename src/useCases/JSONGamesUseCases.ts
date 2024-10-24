import { v4 as uuidv4 } from "uuid";
import { GlobalStateService } from "../services/globalStateService";
import { JSONAPIService } from "../services/jsonApi/jsonApiService";
import {
  IFormData,
  IGameCard,
  IGameDetail,
  IGenres,
  IPlatforms,
  ITags,
} from "../types";

async function GetGames(param: string) {
  try {
    const response = await JSONAPIService.getGames(param);
    const gamesData: IGameCard[] = [];
    const items = response.items;
    response.data.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.title || "No data available",
        genres: r.genres || ["No data available"],
        image: r.image,
        platforms: r.platforms || ["No data available"],
        releaseDate: r.releaseDate || "No data available",
        source: "json",
      });
    });
    console.log(response);
    GlobalStateService.setItems(items);
    GlobalStateService.setGames(gamesData);
  } catch (e) {
    console.log(e);
  }
}
async function getItems() {
  try {
    const response = await JSONAPIService.getItems();
    GlobalStateService.setItems(response);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
async function GetFavorites() {
  try {
    const response = await JSONAPIService.getFavorites();
    const gamesData: IGameCard[] = [];
    response.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.title,
        genres: r.genres,
        image: r.image,
        platforms: r.platforms,
        releaseDate: r.releaseDate,
        source: "json",
      });
    });
    GlobalStateService.setFavorites(gamesData);
  } catch (e) {
    console.log(e);
  }
}
async function GameInfo(game: string) {
  try {
    const response = await JSONAPIService.getGameInfo(game);
    const gameData: IGameDetail[] = [
      {
        id: response.id,
        title: response.title,
        about: response.about,
        backgroundImage: response.image,
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
      },
    ];
    console.log(gameData);
    GlobalStateService.setGameInfo(gameData);
  } catch (e) {
    console.log(e);
  }
}
async function createGame(game: IFormData) {
  try {
    const genres = GlobalStateService.getGenresOutsideComponent();
    const platforms = GlobalStateService.getGenresOutsideComponent();
    const mapGenres = new Map(genres.map((g) => [g.id, g]));
    const mapPlatforms = new Map(platforms.map((p) => [p.id, p]));
    const id = uuidv4();
    const gameObj: IGameDetail = {
      ...game,
      id,
      tags: game.tags.map((t: number) => {
        const value = mapGenres.get(t);
        return {
          id: t,
          name: value ? value.name : "Tag not found",
        };
      }),
      genres: game.genres.map((genre: IGenres) => ({
        id: genre.id,
        name: genre.name,
      })),
      platforms: game.platforms.map((platform: IPlatforms) => ({
        platform: { id: platform.platform.id, name: platform.platform.name },
        requirements: platform.requirements,
        releasedAt: platform.releasedAt,
      })),
    };
    await JSONAPIService.createGame(gameObj);
  } catch (e) {
    console.log(e);
  }
}
export const JSONGamesUseCases = {
  GetGames,
  GetFavorites,
  GameInfo,
  createGame,
  getItems,
};
