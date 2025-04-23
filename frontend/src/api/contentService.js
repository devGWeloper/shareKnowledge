import axios from 'axios';

const API_URL = '/api/contents/';

// 컨텐츠 목록 조회
const getContents = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.category) {
    queryParams.append('category', params.category);
  }
  
  if (params.search) {
    queryParams.append('search', params.search);
  }
  
  if (params.page) {
    queryParams.append('page', params.page);
  }
  
  if (params.size) {
    queryParams.append('size', params.size);
  }
  
  if (params.sort) {
    queryParams.append('sort', params.sort);
  }
  
  const url = `${API_URL}?${queryParams.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

// 컨텐츠 상세 조회
const getContentById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// 컨텐츠 생성
const createContent = async (contentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const formData = new FormData();
  
  // 이미지 파일이 있는 경우 formData에 추가
  if (contentData.thumbnail) {
    formData.append('thumbnail', contentData.thumbnail);
  }
  
  // 나머지 데이터를 JSON으로 변환하여 추가
  const contentJson = { ...contentData };
  delete contentJson.thumbnail;
  formData.append('content', JSON.stringify(contentJson));
  
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

// 컨텐츠 수정
const updateContent = async (id, contentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const formData = new FormData();
  
  // 이미지 파일이 있는 경우 formData에 추가
  if (contentData.thumbnail) {
    formData.append('thumbnail', contentData.thumbnail);
  }
  
  // 나머지 데이터를 JSON으로 변환하여 추가
  const contentJson = { ...contentData };
  delete contentJson.thumbnail;
  formData.append('content', JSON.stringify(contentJson));
  
  const response = await axios.put(API_URL + id, formData, config);
  return response.data;
};

// 컨텐츠 삭제
const deleteContent = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  await axios.delete(API_URL + id, config);
};

// 컨텐츠 좋아요
const likeContent = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.post(`${API_URL}${id}/like`, {}, config);
  return response.data;
};

// 사용자가 작성한 컨텐츠 조회
const getUserContents = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(`/api/users/${userId}/contents`, config);
  return response.data;
};

const contentService = {
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  likeContent,
  getUserContents,
};

export default contentService; 