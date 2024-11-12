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

function sortByRating(games: IGameDetail[]): IGameDetail[] {
  return games.sort((a, b) => b.rating - a.rating);
}
function sortByName(games: IGameCard[]): IGameCard[] {
  return games.sort((a, b) => a.title.localeCompare(b.title));
}
function sortByReleaseDate(
  games: IGameCard[],
  order: "asc" | "desc" = "asc"
): IGameCard[] {
  return games.sort((a, b) => {
    const dateA = new Date(a.releaseDate).getTime();
    const dateB = new Date(b.releaseDate).getTime();

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}
async function GetGames(
  page: number,
  genres?: number[],
  platforms?: number[],
  orderby?: string
) {
  try {
    const response = await JSONAPIService.getGames(page);
    const gamesData: IGameCard[] = [];
    const items = response.items;

    const genreIds = new Set(genres?.map((genre) => genre));
    const platformsIds = new Set(platforms?.map((platform) => platform));

    let filtered = response.data;
    if (genres && genres.length > 0) {
      filtered = filtered.filter((r: any) => {
        return r.genres.some((g: any) => genreIds.has(g.id));
      });
    }
    if (platforms && platforms.length > 0) {
      filtered = filtered.filter((r: any) => {
        return r.platforms.some((g: any) => platformsIds.has(g.platform.id));
      });
    }

    if (orderby && orderby != "") {
      if (orderby == "name") {
        filtered = sortByName(filtered);
      } else if (orderby == "rating") {
        filtered = sortByRating(filtered);
      } else if (orderby == "released") {
        filtered = sortByReleaseDate(filtered, "desc");
      } else {
        console.log("Wrong type");
        return filtered;
      }
    }

    filtered.forEach((r: any) => {
      gamesData.push({
        id: r.id,
        title: r.title || "No data available",
        genres: r.genres || ["No data available"],
        image: r.backgroundImage.url,
        platforms: r.platforms || ["No data available"],
        releaseDate: r.releaseDate || "No data available",
        source: "json",
      });
    });
    console.log(gamesData);
    GlobalStateService.setItems(items);
    GlobalStateService.setGames(gamesData);
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
      },
    ];

    GlobalStateService.setGameInfo(gameData);
  } catch (e) {
    console.log(e);
  }
}
async function createGame(game: IFormData) {
  try {
    const genres = GlobalStateService.getGenresOutsideComponent();
    const platforms = GlobalStateService.getPlatformsOutsideComponent();
    const tags = GlobalStateService.getTagsOutsideComponent();
    const mapGenres = new Map(genres.map((g) => [g.id, g]));
    const mapPlatforms = new Map(platforms.map((p) => [p.id, p]));
    const mapTags = new Map(tags.map((t) => [t.id, t]));
    const id = uuidv4();

    const gameObj: IGameDetail = {
      ...game,
      id,
      tags: game.tags.map((t: number) => {
        const value = mapTags.get(t);
        return {
          id: t,
          name: value ? value.name : "Tag not found",
        };
      }),

      backgroundImage: game.backgroundImage,
      screenshots: game.screenshots?.map((s: any) => {
        return { image: s };
      }),
      genres: game.genres.map((genre: number) => {
        const value = mapGenres.get(genre);
        return {
          id: genre,
          name: value ? value.name : "Genre not found",
        };
      }),
      platforms: game.platforms.map((platform: number) => {
        const value = mapPlatforms.get(platform);
        return {
          platform: {
            id: platform,
            name: value ? value.name : "Platform not found",
          },
          requirements: { minimum: "No info", recommended: "No info" },
          releasedAt: "No info",
        };
      }),
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
};
