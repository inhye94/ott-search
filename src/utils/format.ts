export const getMedia = (media) => {
  const mediaObject = {
    tv: "tv",
    movie: "영화",
  };

  return mediaObject[media];
};

export const fullImagePath = (path: string) => {
  return process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + path;
};
