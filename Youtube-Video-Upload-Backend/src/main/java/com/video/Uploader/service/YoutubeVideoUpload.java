package com.video.Uploader.service;

import com.google.api.client.http.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class YoutubeVideoUpload {

    private static final String UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();





    public String uploadVideo(String title, String desc, String visibility, MultipartFile videoFile, String accessToken) throws Exception {
        HttpRequestFactory requestFactory=HTTP_TRANSPORT.createRequestFactory();

        String metaData="{\n" +
                "  \"snippet\": {\n" +
                "    \"title\": \""+title+"\",\n" +
                "    \"description\": \""+desc+"\",\n" +
                "    \"tags\": [\"learn code with Deepak\", \"Deepak\", \"technology\"],\n" +
                "    \"categoryId\": 22\n" +
                "  },\n" +
                "  \"status\": {\n" +
                "    \"privacyStatus\": \""+visibility+"\",\n" +
                "    \"embeddable\": true,\n" +
                "    \"license\": \"youtube\"\n" +
                "  }\n" +
                "}";

        HttpRequest request=requestFactory.buildRequest(
                HttpMethods.POST,
                new GenericUrl(UPLOAD_URL),
                ByteArrayContent.fromString("application/json",metaData)

        );
        request.getHeaders().setAuthorization("Bearer "+ accessToken);
        request.getHeaders().setContentType("application/json");
        HttpResponse response = request.execute();
        // video meta data created:

        // now video upload

        String videoUploadUrl = response.getHeaders().getLocation();

        HttpRequest httpRequest = requestFactory.buildPutRequest(
                new GenericUrl(videoUploadUrl),
                new InputStreamContent("video/*", videoFile.getInputStream())
        );

        HttpResponse httpResponse = httpRequest.execute();

        return "Video uploaded successfully";

    }



}


