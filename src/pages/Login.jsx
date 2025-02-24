import { Box, Button } from "@mui/material";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useAuth } from '../helper/AuthContext';

function Login() {

  const navigate = useNavigate();
  const { token, loginUser } = useAuth();

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube.upload",
    onSuccess: (response) => {
      console.log(response);
      loginUser(response.access_token);
      navigate('/dashboard/upload');
    },
    onError: (error) => {
      toast.error("Login failed");
      console.log(error);
    }
  });

  return (
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Button startIcon={<GoogleIcon />} size="large" variant="contained" color="primary" onClick={() => {
        login();
      }}>
        Login with Google
      </Button>
    </Box>
  );
}

export default Login;