package com.issmuseum.controller;

import com.issmuseum.model.MediaItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;

@RestController
public class MediaController {

    @GetMapping("/api/media")
    public List<MediaItem> media() {
        List<MediaItem> list = new ArrayList<>();
        // Replace these placeholders with your actual images in /static/media/
        list.add(new MediaItem("1", "ISS Exterior", "/media/iss_exterior_thumb.jpg", "/media/iss_exterior.jpg", "image"));
        list.add(new MediaItem("2", "Earth from ISS", "/media/earth_thumb.jpg", "/media/earth_from_iss.jpg", "image"));
        list.add(new MediaItem("3", "ISS Tour (YouTube)", "/media/video_preview_1.jpg", "https://www.youtube.com/watch?v=INSERT_VIDEO_ID", "video"));
        return list;
    }
}
