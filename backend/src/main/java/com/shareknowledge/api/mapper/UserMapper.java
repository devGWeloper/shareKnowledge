package com.shareknowledge.api.mapper;

import com.shareknowledge.api.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * User 엔티티에 대한 데이터베이스 액세스를 위한 MyBatis 매퍼 인터페이스입니다.
 */
@Mapper
public interface UserMapper {
    
    /**
     * 모든 사용자를 조회합니다.
     * 
     * @return 모든 사용자 목록
     */
    List<User> getAllUsers();
    
    /**
     * ID로 사용자를 조회합니다.
     * 
     * @param id 사용자 ID
     * @return 찾은 사용자 또는 null
     */
    User getUserById(@Param("id") Long id);
    
    /**
     * 사용자명으로 사용자를 조회합니다.
     * 
     * @param username 사용자명
     * @return 찾은 사용자 또는 null
     */
    User getUserByUsername(@Param("username") String username);
    
    /**
     * 이메일로 사용자를 조회합니다.
     * 
     * @param email 이메일
     * @return 찾은 사용자 또는 null
     */
    User getUserByEmail(@Param("email") String email);
    
    /**
     * 새 사용자를 추가합니다.
     * 
     * @param user 추가할 사용자 정보
     * @return 영향받은 행 수
     */
    int insertUser(User user);
    
    /**
     * 사용자 정보를 업데이트합니다.
     * 
     * @param user 업데이트할 사용자 정보
     * @return 영향받은 행 수
     */
    int updateUser(User user);
    
    /**
     * ID로 사용자를 삭제합니다.
     * 
     * @param id 삭제할 사용자 ID
     * @return 영향받은 행 수
     */
    int deleteUser(@Param("id") Long id);
    
    /**
     * 사용자명이 이미 존재하는지 확인합니다.
     * 
     * @param username 확인할 사용자명
     * @return 존재하면 true, 아니면 false
     */
    boolean existsByUsername(@Param("username") String username);
    
    /**
     * 이메일이 이미 존재하는지 확인합니다.
     * 
     * @param email 확인할 이메일
     * @return 존재하면 true, 아니면 false
     */
    boolean existsByEmail(@Param("email") String email);
} 