package com.shareknowledge.api.mapper;

import com.shareknowledge.api.model.Content;
import com.shareknowledge.api.model.ContentStatus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Content 엔티티에 대한 데이터베이스 액세스를 위한 MyBatis 매퍼 인터페이스입니다.
 */
@Mapper
public interface ContentMapper {
    
    /**
     * 모든 콘텐츠를 조회합니다.
     * 
     * @return 모든 콘텐츠 목록
     */
    List<Content> getAllContents();
    
    /**
     * 상태별로 콘텐츠를 조회합니다.
     * 
     * @param status 콘텐츠 상태
     * @return 해당 상태의 콘텐츠 목록
     */
    List<Content> getContentsByStatus(@Param("status") ContentStatus status);
    
    /**
     * 작성자 ID로 콘텐츠를 조회합니다.
     * 
     * @param authorId 작성자 ID
     * @return 해당 작성자의 콘텐츠 목록
     */
    List<Content> getContentsByAuthorId(@Param("authorId") Long authorId);
    
    /**
     * 카테고리 ID로 콘텐츠를 조회합니다.
     * 
     * @param categoryId 카테고리 ID
     * @return 해당 카테고리의 콘텐츠 목록
     */
    List<Content> getContentsByCategoryId(@Param("categoryId") Long categoryId);
    
    /**
     * ID로 콘텐츠를 조회합니다.
     * 
     * @param id 콘텐츠 ID
     * @return 찾은 콘텐츠 또는 null
     */
    Content getContentById(@Param("id") Long id);
    
    /**
     * 새 콘텐츠를 추가합니다.
     * 
     * @param content 추가할 콘텐츠 정보
     * @return 영향받은 행 수
     */
    int insertContent(Content content);
    
    /**
     * 콘텐츠와 카테고리의 관계를 추가합니다.
     * 
     * @param contentId 콘텐츠 ID
     * @param categoryId 카테고리 ID
     * @return 영향받은 행 수
     */
    int insertContentCategory(@Param("contentId") Long contentId, @Param("categoryId") Long categoryId);
    
    /**
     * 콘텐츠 정보를 업데이트합니다.
     * 
     * @param content 업데이트할 콘텐츠 정보
     * @return 영향받은 행 수
     */
    int updateContent(Content content);
    
    /**
     * 콘텐츠 상태를 업데이트합니다.
     * 
     * @param id 콘텐츠 ID
     * @param status 새 상태
     * @return 영향받은 행 수
     */
    int updateContentStatus(@Param("id") Long id, @Param("status") ContentStatus status);
    
    /**
     * 콘텐츠 조회수를 증가시킵니다.
     * 
     * @param id 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int incrementViewCount(@Param("id") Long id);
    
    /**
     * 콘텐츠 좋아요 수를 증가시킵니다.
     * 
     * @param id 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int incrementLikeCount(@Param("id") Long id);
    
    /**
     * 콘텐츠 좋아요 수를 감소시킵니다.
     * 
     * @param id 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int decrementLikeCount(@Param("id") Long id);
    
    /**
     * ID로 콘텐츠를 삭제합니다.
     * 
     * @param id 삭제할 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int deleteContent(@Param("id") Long id);
    
    /**
     * 콘텐츠와 카테고리의 관계를 삭제합니다.
     * 
     * @param contentId 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int deleteContentCategories(@Param("contentId") Long contentId);
} 