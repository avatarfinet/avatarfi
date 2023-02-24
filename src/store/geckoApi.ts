import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const geckoApi = createApi({
  reducerPath: 'geckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  keepUnusedDataFor: 60 * 5, // 5 mins
  tagTypes: ['GeckoMarketResult'],
  endpoints: (builder) => ({
    getGeckoMarkets: builder.query<
      GeckoMarketResult[],
      { ids?: string[]; perPage?: number; page?: number }
    >({
      query: ({ ids, perPage, page }) =>
        `coins/markets?vs_currency=usd&ids=${(ids ?? []).join(
          '%2C'
        )}&order=market_cap_desc&per_page=${perPage ?? 50}&page=${
          page ?? 1
        }&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C`,
      providesTags: ['GeckoMarketResult'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGeckoMarketsQuery } = geckoApi
