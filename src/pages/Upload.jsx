import { CloudUpload, Description, Title, Visibility, Publish } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Box,
  Alert
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../helper/AuthContext";
import toast from "react-hot-toast";

function Upload() {
  
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [visibility, setVisibility] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function fileBoxChanged(event){
    setVideoFile(event.target.files[0]);
  }

  function changeValue(event){
    const name = event.target.name;
    const value = event.target.value;

    if(name === "title"){
      setTitle(value);
    } else if(name === "desc"){
      setDesc(value);
    } else if(name === "visibility"){
      setVisibility(value);
    }
  }

  async function formSubmitted(){
   try{
    setLoading(true);
    console.log(videoFile);
    // send the file to the server

    const videoUploadUrl = "http://localhost:8080/api/v1/uploadVideo";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("visibility", visibility);
    formData.append("videoFile", videoFile);

    await axios.post(videoUploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'multipart/form-data'
      }
    });

    setMessage("Video uploaded successfully");
    toast.success("uploaded successfully");
   }
   catch(error){
     console.log(error);
     setMessage("Failed to upload video");
     toast.error("Failed to upload video");
    } 
    finally{
      setLoading(false);
    }  
  }

  return (
    <Container maxWidth="md">
      {
        message && <Alert sx={{
          width: "100%",
          marginTop: 5
        }}>
          {message}
        </Alert>
      }
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 5,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          fontWeight={"bold"}
        >
          Video Here
        </Typography>
        <Typography align="center" gutterBottom>
          Please upload your video here of less than 50MB.
        </Typography>

        <Box
          display="flex" flexDirection="column" alignItems="center" marginTop={3} gap={3}
        >
          <TextField
            onChange={changeValue}
            name="title"
            label={"Video Title"}
            variant="outlined"
            fullWidth
            value={title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            name="desc"
            onChange={changeValue}
            label={"Video Description"}
            variant="outlined"
            fullWidth
            multiline
            value={desc}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"start"}
            alignContent={"center"}
          >
            <input
              onChange={fileBoxChanged}
              type="file"
              accept="video/*"
              id="video-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="video-upload">
              <Button
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<CloudUpload />}
              >
                Select File
              </Button>
            </label>
            <Typography>{videoFile ? videoFile.name : "No file selected"}</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Visibility</InputLabel>

            <Select
              name="visibility"
              onChange={changeValue}
              label="Visibility"
              value={visibility}
              startAdornment={
                <InputAdornment position="start">
                  <Visibility color="primary" />
                </InputAdornment>
              }
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="unlisted">Unlisted</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>

          <Box display={"flex"} justifyContent="center">
            <Button
              loading={loading}
              loadingPosition="start"
              disabled={loading}
              onClick={formSubmitted}
              variant="contained"
              color="primary"
              startIcon={<Publish />}
              fontWeight="bold"
              padding={2}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Upload;