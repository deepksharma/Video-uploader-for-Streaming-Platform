import { Box, Button } from "@mui/material";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
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
            console.log('Login with Google');
        }}>
            Login with Google
        </Button>


   </Box>
  );
}

export default Login;
