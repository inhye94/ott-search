import { axiosInstance } from "./client";

import { getYear } from "../../utils/date";
import { fullImagePath } from "../../utils/format";
import type {
  InstanceType,
  MovieInfoResponseType,
  MovieInfoType,
  PopularResponseType,
  PopularType,
  ProviderType,
  ProvidersResponseType,
  SearchItemType,
  SearchResponseType,
  SearchType,
  TvInfoResponseType,
  TvInfoType,
} from "../../model/contents";

export const useTMDB = () => {
  const getContentsData: InstanceType = async (url, options) => {
    return axiosInstance
      .get(url, { params: options })
      .then((res) => {
        const { method, url } = res.config;
        const { status } = res;

        if (status !== 200) {
          throw Error(
            `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
          );
        }

        return res.data;
      })
      .catch((error) => console.error(error.message));
  };

  const getPopularMovies: PopularType = async (params) => {
    return getContentsData<PopularResponseType>("movie/popular", params)
      .then((data) => data.results)
      .then((data) =>
        data.map((item) => ({
          ...item,
          poster_path: fullImagePath(item.poster_path),
        }))
      );
  };

  const getMovieInfo: MovieInfoType = async (id, params) => {
    return getContentsData<MovieInfoResponseType>(`movie/${id}`, params) //
      .then((data) => ({
        ...data,
        backdrop_path: fullImagePath(data.backdrop_path || data.poster_path),
        poster_path: fullImagePath(data.poster_path),
        release_year: getYear(data.release_date),
        vote_average: Number(data.vote_average.toFixed(1)),
        media_type: "영화",
      }));
  };

  const getTvInfo: TvInfoType = async (id, params) => {
    return getContentsData<TvInfoResponseType>(`tv/${id}`, params) //
      .then((data) => {
        const networks = data.networks.map((streaming) => ({
          ...streaming,
          logo_path: fullImagePath(streaming.logo_path),
        }));

        return {
          ...data,
          backdrop_path: fullImagePath(data.backdrop_path || data.poster_path),
          poster_path: fullImagePath(data.poster_path),
          release_year: getYear(data.first_air_date),
          title: data.name,
          original_title: data.original_name,
          media_type: "TV",
          networks,
        };
      });
  };

  const getMovieProvider: ProviderType = async (id, params) => {
    return getContentsData<ProvidersResponseType>(
      `movie/${id}/watch/providers`,
      params
    ) //
      .then((data) => data?.results?.KR);
  };

  const getTvProvider: ProviderType = async (id, params) => {
    return getContentsData<ProvidersResponseType>(
      `tv/${id}/watch/providers`,
      params
    ) //
      .then((data) => data?.results?.KR);
  };

  const getSearchResult: SearchType = async (params) => {
    return getContentsData<SearchResponseType>("search/multi", {
      include_adult: true,
      ...params,
    })
      .then((data) => (data.results.length ? data.results : null))
      .then((data) => (data ? filterWithoutPerson(data) : null))
      .then((data) => {
        if (!data) return null;

        return data.map((item) => {
          const imagePath = item.poster_path || item.profile_path;

          return {
            ...item,
            poster_path: imagePath ? fullImagePath(imagePath) : "",
            title: item.name || item.title,
            original_title: item.original_name || item.original_title,
            release_year: getYear(item.first_air_date || item.release_date),
          };
        });
      });
  };

  return {
    getPopularMovies,
    getMovieInfo,
    getTvInfo,
    getMovieProvider,
    getTvProvider,
    getSearchResult,
  };
};

function filterWithoutPerson(results: SearchItemType[]) {
  return results.filter((item) => item.media_type !== "person");
}
