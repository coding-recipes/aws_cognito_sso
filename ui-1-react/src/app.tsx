import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRoutes } from './routes'
import { reactQueryConfig } from "./config";
import './app.css'
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({ defaultOptions: reactQueryConfig });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
