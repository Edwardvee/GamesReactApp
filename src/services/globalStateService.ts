import zustand, { create } from "zustand";
import { IGameDetail, IGameCard } from "../types";

interface IGlobalDataState {
  games: IGameCard[];
  game: IGameDetail[];
  discoverGames: IGameCard[];
  page: number;
  pageSize: number;
}
const initialStoreData: IGlobalDataState = {
  games: [],
  game: [],
  discoverGames: [],
  page: 1,
  pageSize: 10,
};

const globalDataState = create(() => initialStoreData);

function getGames() {
  return globalDataState((state) => {
    return state.games;
  });
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

export const GlobalStateService = {
  getGames,
  setGames,
  getGameInfo,
  setGameInfo,
  getDiscoverGames,
  setDiscoverGames,
  setGamesPage,
  getGamesPage,
};
