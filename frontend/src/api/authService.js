import axios from 'axios';

const API_URL = '/api/auth/';

// 회원가입
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// 로그인
const login = async (userData) => {
  const response = await axios.post(API_URL + 'signin', userData);
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response.data;
};

// 로그아웃
const logout = () => {
  localStorage.removeItem('user');
};

// 프로필 조회
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(API_URL + 'profile', config);
  return response.data;
};

// 프로필 수정
const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.put(API_URL + 'profile', userData, config);
  
  // 로컬 스토리지 업데이트
  const user = JSON.parse(localStorage.getItem('user'));
  const updatedUser = { ...user, ...response.data };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  
  return response.data;
};

// 비밀번호 변경
const changePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.put(API_URL + 'change-password', passwordData, config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
};

export default authService; 