package com.shareknowledge.api.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * MyBatis 설정을 위한 클래스입니다.
 */
@Configuration
@MapperScan("com.shareknowledge.api.mapper")
public class MyBatisConfig {
    // MyBatis 기본 설정은 application.properties에서 처리됩니다.
} 