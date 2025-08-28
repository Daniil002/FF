// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { hhApi } from './vacancy.api'
import inputReducer from './inputSlice'
export const store = configureStore({
  reducer: {
    [hhApi.reducerPath]: hhApi.reducer,
    input: inputReducer, // добавьте этот редюсер

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hhApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
