import { combineReducers } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'
import geckoReducer from './geckoSlice'
import compReducer from './compSlice'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { geckoPersistApi } from './geckoPersistApi'
import { geckoApi } from './geckoApi'
export * from './authSlice'
export * from './userSlice'
export * from './geckoSlice'
export * from './compSlice'
export * from './geckoPersistApi'
export * from './geckoApi'

const geckoPersistApiPath = geckoPersistApi.reducerPath
const geckoApiPath = geckoApi.reducerPath

const persistConfig = {
  timeout: 500,
  key: 'root',
  storage,
  whitelist: ['auth', geckoPersistApiPath],
}

const reducer = combineReducers({
  [geckoPersistApiPath]: geckoPersistApi.reducer,
  [geckoApiPath]: geckoApi.reducer,
  auth: authReducer,
  comp: compReducer,
  user: userReducer,
  gecko: geckoReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

// config the store
const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 1024 },
        serializableCheck: {
          warnAfter: 1024,
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(geckoPersistApi.middleware)
        .concat(geckoApi.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>

// export default the store
export default createWrapper<AppStore>(makeStore)
