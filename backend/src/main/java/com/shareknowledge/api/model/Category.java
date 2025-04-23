package com.shareknowledge.api.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Long id;
    
    @NotBlank
    @Size(max = 50)
    private String name;
    
    private String description;
    
    private String iconUrl;
} 