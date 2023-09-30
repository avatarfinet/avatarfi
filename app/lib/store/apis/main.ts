import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['GeckoMarketResult'],
  endpoints: (build) => ({
    // BREAK
  }),
})

export const mainPersistApi = createApi({
  reducerPath: 'mainPersistApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    // BREAK
  }),
})
