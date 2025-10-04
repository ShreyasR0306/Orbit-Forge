package com.issmuseum.controller;

import com.issmuseum.model.NewsItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;

@RestController
public class NewsController {

    @GetMapping("/api/news")
    public List<NewsItem> listNews() {
        ArrayList<NewsItem> out = new ArrayList<>();
        NewsItem n = new NewsItem();
        n.id = "n1";
        n.title = "Plant growth experiment aboard the ISS";
        n.summary = "Short summary: researchers observed improved root orientation in microgravity...";
        n.image = "/media/news_plant_thumb.jpg";
        n.url = "/api/news/n1";
        n.date = "2025-09-01";
        out.add(n);
        return out;
    }

    @GetMapping("/api/news/{id}")
    public NewsItem getNews(@PathVariable String id) {
        NewsItem n = new NewsItem();
        n.id = id;
        n.title = "Plant growth experiment aboard the ISS (full)";
        n.summary = "Full article content goes here. Replace this with the real article body or HTML.";
        n.image = "/media/news_plant.jpg";
        n.url = "";
        n.date = "2025-09-01";
        return n;
    }
}
