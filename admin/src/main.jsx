import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <QueryClientProvider client = {queryClient}>
  <AuthProvider>
    <Toaster />    
      <App />
  </AuthProvider>
  </QueryClientProvider>
  </BrowserRouter>
  </StrictMode>,
)
