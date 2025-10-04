package com.issmuseum.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
public class IssController {

    @GetMapping("/api/iss/now")
    public Map<?,?> issNow() {
        RestTemplate rt = new RestTemplate();
        String url = "http://api.open-notify.org/iss-now.json";
        Map<?,?> m = rt.getForObject(url, Map.class);
        return m;
    }
}
