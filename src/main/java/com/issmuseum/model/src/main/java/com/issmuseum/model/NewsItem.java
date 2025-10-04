package com.issmuseum.model;

public class NewsItem {
    public String id;
    public String title;
    public String summary;
    public String image; // relative path
    public String url; // external or internal detail endpoint
    public String date; // ISO date e.g. 2025-09-01

    public NewsItem() {}
}
