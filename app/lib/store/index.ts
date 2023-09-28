import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer, userReducer, geckoReducer, compReducer } from './slices'
import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import storage from './storage'
import { mainApi, mainPersistApi } from './apis/main'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  [mainPersistApi.reducerPath]: persistReducer(
    persistConfig,
    mainPersistApi.reducer
  ),
  // Non Persisted
  [mainApi.reducerPath]: mainApi.reducer,
  comp: compReducer,
  user: userReducer,
  gecko: geckoReducer,
})

// config the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      mainApi.middleware,
      mainPersistApi.middleware,
    ]),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export * from './slices'
export * from './apis'
