import {
  PATCH_ADD_USER_TRACKED_GECKO_COINS,
  PATCH_PULL_USER_TRACKED_GECKO_COINS,
} from '@/lib'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const geckoApi = createApi({
  reducerPath: 'geckoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  keepUnusedDataFor: 60 * 5, // 5 mins
  tagTypes: ['GeckoMarketResult'],
  endpoints: (builder) => ({
    // SEARCH RESULTS
    getGeckoSearch: builder.query<GeckoMarketResult[], { ids?: string[] }>({
      query: ({ ids }) =>
        `coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc`,
    }),
    // MARQUE RESULTS
    getGeckoMarqueMarkets: builder.query<GeckoMarketResult[], {}>({
      query: () =>
        `coins/markets?vs_currency=usd&ids=${[].join(
          '%2C'
        )}&order=market_cap_desc&price_change_percentage=24h`,
    }),
    // INDICATORS
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
    // USER TRACKED GECKO COINS
    patchUserTrackedGeckoCoins: builder.mutation<
      string[],
      { id: string; type: 'add' | 'pull'; selectedGeckoCoins: string[] }
    >({
      query: ({ id, type, selectedGeckoCoins }) => ({
        url: `${window.origin}/api/users?id=${id}&action=${
          type === 'add'
            ? PATCH_ADD_USER_TRACKED_GECKO_COINS
            : PATCH_PULL_USER_TRACKED_GECKO_COINS
        }`,
        method: 'PATCH',
        body: {
          trackedGeckoCoins: selectedGeckoCoins,
        },
      }),
      invalidatesTags: ['GeckoMarketResult'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGeckoSearchQuery,
  useGetGeckoMarqueMarketsQuery,
  useGetGeckoMarketsQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} = geckoApi
