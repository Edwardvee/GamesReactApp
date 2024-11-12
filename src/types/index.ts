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
export interface IScreenshot {
  id?: number;
  image: string;
  width?: number;
  height?: number;
}
export interface IGameDetail {
  id: string;
  title: string;
  backgroundImage: string;
  about: string;
  releaseDate: string;
  rating: number;
  genres: IGenres[];
  platforms: IPlatforms[];
  tags: ITags[];
  screenshots?: IScreenshot[];
  source: "api" | "json";
}
export interface IGameCard {
  id: string;
  title: string;
  releaseDate: string;
  genres: IGenres[];
  platforms: IPlatforms[];
  image: string;
  source: "api" | "json";
}
export interface IFormData
  extends Omit<IGameDetail, "genres" | "platforms" | "tags" | "screenshots"> {
  tags: number[];
  genres: number[];
  platforms: number[];
  screenshots?: string[];
}
export interface IFilter {
  param: string;
  value: string;
}
export interface userOptions {
  source: "api" | "json";
  orderBy: string;
  genres: number[];
  platforms: number[];
}
