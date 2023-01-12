import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import uploadFileApi from './uploadFile'

export const store = configureStore({
  reducer: {
    [uploadFileApi.reducerPath]: uploadFileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(uploadFileApi.middleware),
})

setupListeners(store.dispatch)
