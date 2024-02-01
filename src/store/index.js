// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers

import permissions from 'src/store/apps/permissions'

export const store = configureStore({
  reducer: {
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
