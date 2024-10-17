// NOTE: Instance Type
export type InstanceType = <T>(url: string, options?: {}) => Promise<T>;

// NOTE: Movie
export type MovieInfoType = (
  id: number,
  params?: {}
) => Promise<MovieInfoResponseType>;

interface GenreType {
  id: number;
  name: string;
}

interface CollectionType {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface ProductionCompaniesType {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

interface ProductionCountriesType {
  iso_3166_1: string;
  name: string;
}

interface LanguageType {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieInfoResponseType {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: CollectionType[] | null;
  budget?: number;
  genres: GenreType[] | [];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[] | [];
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies?: ProductionCompaniesType[] | [];
  production_countries?: ProductionCountriesType[] | [];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: LanguageType[] | [];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  release_year?: string;
  media_type?: string;
}

// NOTE: TV
export type TvInfoType = (
  id: number,
  params?: {}
) => Promise<TvInfoResponseType>;

interface CreatedByType {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface EpisodeType {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface NetworksType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface SeasonType {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
  vote_average: number;
}

export interface TvInfoResponseType extends MovieInfoResponseType {
  created_by: CreatedByType[] | [];
  episode_run_time: [];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeType;
  name: string;
  next_episode_to_air: EpisodeType | null;
  networks: NetworksType[] | [];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  type: string;
  seasons: SeasonType[] | [];
}

// NOTE: Popular
export type PopularType = (params?: {}) => Promise<PopularItem[]>;

interface PopularItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[] | [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularResponseType {
  page: number;
  results: PopularItem[];
  total_page: number;
  total_results: number;
}

// NOTE: Provider
export type ProviderType = (
  id: number,
  params?: {}
) => Promise<ProviderItemType>;

export interface ProviderInfoType {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface ProviderItemType {
  link?: string;
  rent?: ProviderInfoType[];
  buy?: ProviderInfoType[];
  flatrate?: ProviderInfoType[];
}

export interface ProvidersResponseType {
  id: number;
  results?: {
    [key: string]: ProviderItemType;
  };
}

// NOTE: Search
export type SearchType = (params: {}) => Promise<SearchItemType[] | null>;

export interface SearchItemType {
  backdrop_path: string;
  id: number;
  name?: string;
  title?: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  profile_path?: string;
  release_year?: string;
}

export interface SearchResponseType {
  page: number;
  results: SearchItemType[] | [];
  total_pages: number;
  total_results: number;
}
