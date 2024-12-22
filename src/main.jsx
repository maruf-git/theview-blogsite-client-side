import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import MainRoute from './routes/MainRoute'
import AuthProvider from './providers/AuthProvider'
import ThemeProvider from './providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <Toaster />
        <RouterProvider router={MainRoute} />
      </ThemeProvider>
    </AuthProvider>

  </StrictMode>,
)
