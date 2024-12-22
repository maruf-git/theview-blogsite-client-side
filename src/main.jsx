import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import MainRoute from './routes/MainRoute'
import AuthProvider from './providers/AuthProvider'
import ThemeProvider from './providers/ThemeProvider'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={MainRoute} />
      </ThemeProvider>
    </AuthProvider>

  </StrictMode>,
)
