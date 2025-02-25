package com.video.Uploader.controller;

import com.video.Uploader.service.YoutubeVideoUpload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/uploadVideo")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React app
public class YoutubeVideoServiceController {
    private final YoutubeVideoUpload youtubeVideoUpload;

    public YoutubeVideoServiceController(YoutubeVideoUpload youtubeVideoUpload) {
        this.youtubeVideoUpload = youtubeVideoUpload;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("desc") String desc,
            @RequestParam("visibility") String visibility,
            @RequestParam("videoFile") MultipartFile videoFile,
            @RequestParam("accessToken") String accessToken
    ) {
        try {
            if (videoFile.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is missing!");
            }
            String response = youtubeVideoUpload.uploadVideo(
                    title, desc, visibility, videoFile, accessToken.replace("Bearer ", ""));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }
}
