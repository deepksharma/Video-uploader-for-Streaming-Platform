import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './pages/Login.jsx';
import Upload from './pages/Upload.jsx';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './helper/Theme.js';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './helper/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1084665983072-ibn3m3epuqjlbj02d403dk9afntg8ul0.apps.googleusercontent.com">
    <AuthProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Toaster />
      <BrowserRouter>
        <Routes>
        <Route path='' element={<Navigate to={'/login'} />} />
          <Route path='/dashboard' element={<Home />} >
           
            <Route path='upload' element={<Upload />} />
            <Route path='list' element={<h1>This is list page</h1>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);