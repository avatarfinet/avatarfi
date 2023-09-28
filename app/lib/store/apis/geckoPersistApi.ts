import { mainPersistApi } from './main'

function createIdObject(geckoList: any) {
  const idObject: any = {}
  geckoList.forEach((coin: any) => {
    const firstLetter = coin.name.charAt(0).toUpperCase()
    if (idObject[firstLetter]) {
      idObject[firstLetter].push(coin)
    } else {
      idObject[firstLetter] = [coin]
    }
  })
  return idObject
}

// Define a service using a base URL and expected endpoints
export const geckoPersistApi = mainPersistApi.injectEndpoints({
  endpoints: (builder) => ({
    getGeckoCoinsList: builder.query<{ [key: string]: GeckoCoins }, {}>({
      query: () => 'coins/list',
      transformResponse: (response: GeckoCoins) => {
        return createIdObject(response) as { [key: string]: GeckoCoins }
      },
      keepUnusedDataFor: 60 * 60 * 24 * 5, // 5 days
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGeckoCoinsListQuery } = geckoPersistApi
