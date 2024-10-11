import { getYear } from "../../utils/date";
import { axiosInstance } from "./client";

export const useTMDB = () => {
  const getContentsData = async (url: string, options: {}) => {
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
      .catch((error) => console.log(error.message));
  };

  const getPopularMovies = async (params?: {}) => {
    return getContentsData("movie/popular", params)
      .then((data) => data.results)
      .then((data) =>
        data.map((item) => {
          const poster_path =
            process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + item.poster_path;
          return { ...item, poster_path };
        })
      );
  };

  const getMovieInfo = async (id: number, params?: {}) => {
    return getContentsData(`movie/${id}`, params) //
      .then((data) => {
        const backdrop_path =
          process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
          (data.backdrop_path || data.poster_path);
        const poster_path =
          process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + data.poster_path;
        const release_year = getYear(data.release_date);
        const vote_average = data.vote_average.toFixed(1);

        return {
          ...data,
          backdrop_path,
          poster_path,
          release_year,
          vote_average,
        };
      });
  };

  const getTvInfo = async (id: number, params?: {}) => {
    return getContentsData(`tv/${id}`, params) //
      .then((data) => {
        const backdrop_path =
          process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
          (data.backdrop_path || data.poster_path);
        const poster_path =
          process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + data.poster_path;
        const release_year = getYear(data.first_air_date);
        const networks = data.networks.map((streaming) => ({
          ...streaming,
          logo_path:
            process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + streaming.logo_path,
        }));
        const title = data.name;
        const original_title = data.original_name;

        return {
          ...data,
          backdrop_path,
          poster_path,
          release_year,
          networks,
          title,
          original_title,
        };
      });
  };

  const getMovieProvider = async (id: number, params?: {}) => {
    return getContentsData(`movie/${id}/watch/providers`, params).then(
      (data) => data?.results?.KR
    );
  };

  const getTvProvider = async (id: number, params?: {}) => {
    return getContentsData(`tv/${id}/watch/providers`, params).then(
      (data) => data?.results?.KR
    );
  };

  const getSearchResult = async (params: {}) => {
    return getContentsData("search/multi", {
      include_adult: true,
      ...params,
    })
      .then((data) => data.results)
      .then((data) => data.filter((item) => item.media_type !== "person"))
      .then((data) =>
        data.map((item) => {
          const poster_path =
            item.poster_path || item.profile_path
              ? process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                (item.poster_path || item.profile_path)
              : "";
          const title = item.name || item.title;
          const original_title = item.original_name || item.original_title;
          const release_year = getYear(
            item.first_air_date || item.release_date
          );

          return {
            ...item,
            poster_path,
            title,
            original_title,
            release_year,
          };
        })
      );
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
