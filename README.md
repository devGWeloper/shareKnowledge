# 지식 공유 웹 플랫폼

Spring Boot, Spring MVC와 React를 활용한 지식 공유 웹 플랫폼입니다.

## 프로젝트 구조

- `backend/` - Spring Boot와 Spring MVC 기반의 백엔드 서버
- `frontend/` - React 기반의 프론트엔드 애플리케이션

## 개발 환경 설정

### 백엔드 (Spring Boot)

1. JDK 17 이상 설치
2. Maven 또는 Gradle 설치
3. 다음 명령어로 백엔드 서버 실행:

```bash
cd backend
./mvnw spring-boot:run
```

### 프론트엔드 (React)

1. Node.js (14 이상) 설치
2. 다음 명령어로 프론트엔드 실행:

```bash
cd frontend
npm install
npm start
```

## 기술 스택

### 백엔드
- Spring Boot
- Spring MVC
- Spring Data JPA
- Spring Security
- PostgreSQL

### 프론트엔드
- React
- React Router
- Redux
- Axios
- Material-UI / Chakra UI 