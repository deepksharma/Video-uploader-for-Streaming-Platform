import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './pages/Login.jsx'
import Upload from './pages/Upload.jsx'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './helper/Theme.js'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='' element={<Navigate to={'/login'} />} />
          <Route path='upload' element={<Upload />} />
          <Route path='list' element={<h1>This is list page</h1>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<App />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)