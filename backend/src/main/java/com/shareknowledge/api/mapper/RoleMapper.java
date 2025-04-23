package com.shareknowledge.api.mapper;

import com.shareknowledge.api.model.ERole;
import com.shareknowledge.api.model.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

/**
 * Role 엔티티에 대한 데이터베이스 액세스를 위한 MyBatis 매퍼 인터페이스입니다.
 */
@Mapper
public interface RoleMapper {
    
    /**
     * 모든 역할을 조회합니다.
     * 
     * @return 모든 역할 목록
     */
    List<Role> getAllRoles();
    
    /**
     * ID로 역할을 조회합니다.
     * 
     * @param id 역할 ID
     * @return 찾은 역할 또는 null
     */
    Role getRoleById(@Param("id") Integer id);
    
    /**
     * 역할 이름으로 역할을 조회합니다.
     * 
     * @param name 역할 이름
     * @return 찾은 역할 또는 null
     */
    Role getRoleByName(@Param("name") ERole name);
    
    /**
     * 사용자 ID에 따른 모든 역할을 조회합니다.
     * 
     * @param userId 사용자 ID
     * @return 역할 목록
     */
    List<Role> getRolesByUserId(@Param("userId") Long userId);
    
    /**
     * 사용자 ID에 역할을 추가합니다.
     * 
     * @param userId 사용자 ID
     * @param roleId 역할 ID
     * @return 영향받은 행 수
     */
    int insertUserRole(@Param("userId") Long userId, @Param("roleId") Integer roleId);
    
    /**
     * 사용자에 해당하는 역할을 삭제합니다.
     * 
     * @param userId 사용자 ID
     * @return 영향받은 행 수
     */
    int deleteUserRoles(@Param("userId") Long userId);
    
    /**
     * 사용자에 대한 특정 역할을 삭제합니다.
     * 
     * @param userId 사용자 ID
     * @param roleId 역할 ID
     * @return 영향받은 행 수
     */
    int deleteUserRole(@Param("userId") Long userId, @Param("roleId") Integer roleId);
} 