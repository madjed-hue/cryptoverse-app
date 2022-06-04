import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoXchangeHeaders = {
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoXchangeHeaders });

const baseUrl = "https://coingecko.p.rapidapi.com";

export const cryptoXchangeApi = createApi({
  reducerPath: "cryptoXchangeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoXchange: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptoXchangeQuery } = cryptoXchangeApi;
