package com.shareknowledge.api.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Content {
    private Long id;

    @NotBlank
    @Size(max = 200)
    private String title;

    @NotBlank
    private String body;
    
    private String thumbnailUrl;
    
    private Integer viewCount = 0;
    
    private Integer likeCount = 0;
    
    private ContentStatus status = ContentStatus.DRAFT;
    
    private User author;
    
    private Set<Category> categories = new HashSet<>();
    
    private List<Comment> comments = new ArrayList<>();
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private LocalDateTime publishedAt;
    
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public void publish() {
        this.status = ContentStatus.PUBLISHED;
        this.publishedAt = LocalDateTime.now();
    }
    
    public void incrementViewCount() {
        this.viewCount++;
    }
    
    public void like() {
        this.likeCount++;
    }
    
    public void unlike() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }
} 