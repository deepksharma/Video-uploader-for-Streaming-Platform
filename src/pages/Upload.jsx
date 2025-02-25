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
  Alert,
  CircularProgress
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
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function fileBoxChanged(event) {
    setVideoFile(event.target.files[0]);
  }

  function changeValue(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "desc") {
      setDesc(value);
    } else if (name === "visibility") {
      setVisibility(value);
    }
  }

  async function formSubmitted() {
    try {
      setLoading(true);
      setMessage("");

      if (!videoFile) {
        toast.error("Please select a video file.");
        setLoading(false);
        return;
      }

      const videoUploadUrl = "http://localhost:8080/api/v1/uploadVideo";
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("visibility", visibility);
      formData.append("videoFile", videoFile);
      formData.append("accessToken", token); // Send token properly

      const response = await axios.post(videoUploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Video uploaded successfully");
      toast.success("Uploaded successfully");

      // Reset fields after successful upload
      setTitle("");
      setDesc("");
      setVisibility("");
      setVideoFile(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage(`Failed to upload video: ${error.response?.data || error.message}`);
      toast.error(`Failed to upload: ${error.response?.data || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
}



  return (
    <Container maxWidth="md">
      {message && (
        <Alert
          sx={{
            width: "100%",
            marginTop: 5
          }}
        >
          {message}
        </Alert>
      )}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 5,
          borderRadius: 3
        }}
      >
        <Typography variant="h5" gutterBottom align="center" fontWeight={"bold"}>
          Upload Video
        </Typography>
        <Typography align="center" gutterBottom>
          Please upload your video (Max: 50MB).
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" marginTop={3} gap={3}>
          <TextField
            onChange={changeValue}
            name="title"
            label="Video Title"
            variant="outlined"
            fullWidth
            value={title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title color="primary" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            name="desc"
            onChange={changeValue}
            label="Video Description"
            variant="outlined"
            fullWidth
            rows={5}
            multiline
            value={desc}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="primary" />
                </InputAdornment>
              )
            }}
          />

          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <input
              onChange={fileBoxChanged}
              type="file"
              accept="video/*"
              id="video-upload"
              style={{ display: "none" }}
            />
            <label htmlFor="video-upload">
              <Button variant="contained" color="secondary" component="span" startIcon={<CloudUpload />}>
                Select File
              </Button>
            </label>
            <Typography>{videoFile ? videoFile.name : "No file selected"}</Typography>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Visibility</InputLabel>
            <Select name="visibility" onChange={changeValue} value={visibility}>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="unlisted">Unlisted</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>

          <Box display={"flex"} gap={2} justifyContent="center">
            <Button variant="outlined">Generate Meta Data</Button>
            <Button
              onClick={formSubmitted}
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Publish />}
              disabled={loading}
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
