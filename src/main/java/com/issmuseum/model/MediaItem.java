package com.issmuseum.model;

public class MediaItem {
    public String id;
    public String title;
    public String thumbnail; // relative path e.g. /media/thumb.jpg
    public String url;       // youtube link or local path
    public String type;      // "image" | "video"

    public MediaItem() {}

    public MediaItem(String id, String title, String thumbnail, String url, String type) {
        this.id = id; this.title = title; this.thumbnail = thumbnail; this.url = url; this.type = type;
    }
}
