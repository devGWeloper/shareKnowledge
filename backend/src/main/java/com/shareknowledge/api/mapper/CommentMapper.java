package com.shareknowledge.api.mapper;

import com.shareknowledge.api.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Comment 엔티티에 대한 데이터베이스 액세스를 위한 MyBatis 매퍼 인터페이스입니다.
 */
@Mapper
public interface CommentMapper {
    
    /**
     * 콘텐츠 ID로 댓글을 조회합니다.
     * 
     * @param contentId 콘텐츠 ID
     * @return 댓글 목록
     */
    List<Comment> getCommentsByContentId(@Param("contentId") Long contentId);
    
    /**
     * 작성자 ID로 댓글을 조회합니다.
     * 
     * @param authorId 작성자 ID
     * @return 댓글 목록
     */
    List<Comment> getCommentsByAuthorId(@Param("authorId") Long authorId);
    
    /**
     * 부모 댓글 ID로 댓글을 조회합니다(대댓글).
     * 
     * @param parentId 부모 댓글 ID
     * @return 대댓글 목록
     */
    List<Comment> getCommentsByParentId(@Param("parentId") Long parentId);
    
    /**
     * ID로 댓글을 조회합니다.
     * 
     * @param id 댓글 ID
     * @return 찾은 댓글 또는 null
     */
    Comment getCommentById(@Param("id") Long id);
    
    /**
     * 새 댓글을 추가합니다.
     * 
     * @param comment 추가할 댓글 정보
     * @return 영향받은 행 수
     */
    int insertComment(Comment comment);
    
    /**
     * 댓글 정보를 업데이트합니다.
     * 
     * @param comment 업데이트할 댓글 정보
     * @return 영향받은 행 수
     */
    int updateComment(Comment comment);
    
    /**
     * ID로 댓글을 삭제합니다.
     * 
     * @param id 삭제할 댓글 ID
     * @return 영향받은 행 수
     */
    int deleteComment(@Param("id") Long id);
    
    /**
     * 콘텐츠에 속한 모든 댓글을 삭제합니다.
     * 
     * @param contentId 콘텐츠 ID
     * @return 영향받은 행 수
     */
    int deleteCommentsByContentId(@Param("contentId") Long contentId);
} 