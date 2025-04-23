import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/slices/uiSlice';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(showNotification({
        message: '로그인이 필요한 페이지입니다.',
        type: 'warning',
      }));
    }
  }, [isAuthenticated, isLoading, dispatch]);
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!isAuthenticated) {
    // 로그인 후 원래 가려던 페이지로 리다이렉트하기 위해 현재 위치를 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

export default ProtectedRoute; 