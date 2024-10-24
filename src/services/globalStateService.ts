import zustand, { create } from "zustand";
import { IGameDetail, IGameCard, IGenres, ITags, IPlatform } from "../types";

interface IGlobalDataState {
  games: IGameCard[];
  game: IGameDetail[];
  favorites: IGameCard[];
  discoverGames: IGameCard[];
  page: number;
  genres: IGenres[];
  tags: ITags[];
  platforms: IPlatform[];
  pageSize: number;
  items: number;
}
const initialStoreData: IGlobalDataState = {
  games: [],
  game: [],
  genres: [],
  favorites: [],
  discoverGames: [],
  platforms: [],
  tags: [],
  page: 1,
  pageSize: 10,
  items: 0,
};

const globalDataState = create(() => initialStoreData);

function getGames() {
  return globalDataState((state) => {
    return state.games;
  });
}
function getGamesOutsideComponent() {
  return globalDataState.getState().games;
}
function getGamesPage() {
  return globalDataState((state) => {
    return state.page;
  });
}
function setGamesPage(page: number) {
  globalDataState.setState((prev) => {
    return { ...prev, page };
  });
}
function getDiscoverGames() {
  return globalDataState((state) => {
    return state.discoverGames;
  });
}
function getGameInfo() {
  return globalDataState((state) => {
    return state.game;
  });
}
function setGames(games: IGameCard[]) {
  globalDataState.setState((prev) => {
    return { ...prev, games: [...prev.games, ...games] };
  });
}

function setGameInfo(game: IGameDetail[]) {
  globalDataState.setState((prev) => {
    return { ...prev, game };
  });
}
function setDiscoverGames(discoverGames: IGameCard[]) {
  globalDataState.setState((prev) => {
    return { ...prev, discoverGames };
  });
}
function getFavorites() {
  return globalDataState((state) => {
    return state.favorites;
  });
}
function setFavorites(favorites: IGameCard[]) {
  globalDataState.setState((prev) => {
    return { ...prev, favorites };
  });
}
function getGenres() {
  return globalDataState((state) => {
    return state.genres;
  });
}
function getGenresOutsideComponent() {
  return globalDataState.getState().genres;
}
function setGenres(genres: IGenres[]) {
  globalDataState.setState((prev) => {
    return { ...prev, genres };
  });
}
function getTags() {
  return globalDataState((state) => {
    return state.tags;
  });
}
function getTagsOutsideComponent() {
  return globalDataState.getState().tags;
}
function setTags(tags: ITags[]) {
  globalDataState.setState((prev) => {
    return { ...prev, tags };
  });
}

function getPlatforms() {
  return globalDataState((state) => {
    return state.platforms;
  });
}
function getPlatformsOutsideComponent() {
  return globalDataState.getState().platforms;
}
function setPlatforms(platforms: IPlatform[]) {
  globalDataState.setState((prev) => {
    return { ...prev, platforms };
  });
}
function deleteGames() {
  globalDataState.setState((prev) => {
    return { ...prev, games: [] };
  });
}
function setItems(items: number) {
  globalDataState.setState((prev) => {
    return { ...prev, items };
  });
}
function getItems() {
  return globalDataState.getState().items;
}
export const GlobalStateService = {
  getGames,
  setGames,
  getGameInfo,
  setGameInfo,
  getDiscoverGames,
  setDiscoverGames,
  setGamesPage,
  getGamesPage,
  getFavorites,
  setFavorites,
  setGenres,
  getGenres,
  getGenresOutsideComponent,
  getPlatforms,
  getPlatformsOutsideComponent,
  setPlatforms,
  getTags,
  getTagsOutsideComponent,
  setTags,
  deleteGames,
  setItems,
  getItems,
  getGamesOutsideComponent,
};
