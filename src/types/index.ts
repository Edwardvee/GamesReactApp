export interface ITags {
  id: number;
  name: string;
}
export interface IPlatform {
  id: number;
  name: string;
}
export interface IPlatforms {
  platform: IPlatform;
  releasedAt: string;
  requirements: IRequirement;
}
export interface IRequirement {
  minimum: string;
  recommended: string;
}
export interface IGenres {
  id: number;
  name: string;
}
export interface IGameDetail {
  id: number;
  title: string;
  backgroundImage: string;
  about: string;
  releaseDate: string;
  rating: number;
  genre: IGenres[];
  platforms: IPlatforms[];
  tags: ITags[];
}
export interface IGameCard {
  id: number;
  title: string;
  releaseDate: string;
  genres: IGenres[];
  platforms: IPlatforms[];
  image: string;
}
