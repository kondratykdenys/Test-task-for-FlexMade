import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import HomePage from './pages/Home'
import theme from './theme'
import { store } from './services'
import UploadedFiles from './pages/UploadedFiles'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/uploaded-files/:uuid',
    element: <UploadedFiles />,
  },
])

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
