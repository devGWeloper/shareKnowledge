import axios from 'axios';

const API_URL = '/api/categories/';

// 카테고리 목록 조회
const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 카테고리 상세 조회
const getCategoryById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// 카테고리 생성 (관리자 권한 필요)
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const formData = new FormData();
  
  // 아이콘 이미지가 있는 경우 formData에 추가
  if (categoryData.icon) {
    formData.append('icon', categoryData.icon);
  }
  
  // 나머지 데이터를 추가
  formData.append('name', categoryData.name);
  
  if (categoryData.description) {
    formData.append('description', categoryData.description);
  }
  
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

// 카테고리 수정 (관리자 권한 필요)
const updateCategory = async (id, categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  
  const formData = new FormData();
  
  // 아이콘 이미지가 있는 경우 formData에 추가
  if (categoryData.icon) {
    formData.append('icon', categoryData.icon);
  }
  
  // 나머지 데이터를 추가
  formData.append('name', categoryData.name);
  
  if (categoryData.description) {
    formData.append('description', categoryData.description);
  }
  
  const response = await axios.put(API_URL + id, formData, config);
  return response.data;
};

// 카테고리 삭제 (관리자 권한 필요)
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  await axios.delete(API_URL + id, config);
};

// 카테고리별 컨텐츠 조회
const getCategoryContents = async (id, params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) {
    queryParams.append('page', params.page);
  }
  
  if (params.size) {
    queryParams.append('size', params.size);
  }
  
  if (params.sort) {
    queryParams.append('sort', params.sort);
  }
  
  const url = `${API_URL}${id}/contents?${queryParams.toString()}`;
  const response = await axios.get(url);
  return response.data;
};

const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryContents,
};

export default categoryService; 