package com.shareknowledge.api.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Long id;

    @NotBlank
    private String body;
    
    private User author;
    
    private Content content;
    
    private Comment parent;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 