package com.shareknowledge.api.mapper;

import com.shareknowledge.api.model.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Category 엔티티에 대한 데이터베이스 액세스를 위한 MyBatis 매퍼 인터페이스입니다.
 */
@Mapper
public interface CategoryMapper {
    
    /**
     * 모든 카테고리를 조회합니다.
     * 
     * @return 모든 카테고리 목록
     */
    List<Category> getAllCategories();
    
    /**
     * ID로 카테고리를 조회합니다.
     * 
     * @param id 카테고리 ID
     * @return 찾은 카테고리 또는 null
     */
    Category getCategoryById(@Param("id") Long id);
    
    /**
     * 이름으로 카테고리를 조회합니다.
     * 
     * @param name 카테고리 이름
     * @return 찾은 카테고리 또는 null
     */
    Category getCategoryByName(@Param("name") String name);
    
    /**
     * 새 카테고리를 추가합니다.
     * 
     * @param category 추가할 카테고리 정보
     * @return 영향받은 행 수
     */
    int insertCategory(Category category);
    
    /**
     * 카테고리 정보를 업데이트합니다.
     * 
     * @param category 업데이트할 카테고리 정보
     * @return 영향받은 행 수
     */
    int updateCategory(Category category);
    
    /**
     * ID로 카테고리를 삭제합니다.
     * 
     * @param id 삭제할 카테고리 ID
     * @return 영향받은 행 수
     */
    int deleteCategory(@Param("id") Long id);
    
    /**
     * 카테고리 이름이 이미 존재하는지 확인합니다.
     * 
     * @param name 확인할 카테고리 이름
     * @return 존재하면 true, 아니면 false
     */
    boolean existsByName(@Param("name") String name);
} 