import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    language: "ko",
  },
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  return config;
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { status } = res;

  if (status !== 200) {
    console.log(
      `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
    );
  }

  console.log(
    `🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url} | status: ${status}`
  );

  return res;
};

const onError = (error: AxiosError): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { status } = error;

    if (error.response) {
      const { status, statusText } = error.response;

      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status} ${statusText}`
      );
    } else {
      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
      );
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);

export { axiosInstance };
