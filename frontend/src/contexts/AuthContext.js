import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register, updateProfile, reset } from '../store/slices/authSlice';
import { showNotification } from '../store/slices/uiSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    // 인증 정보 체크 완료
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (isError) {
      dispatch(showNotification({
        message,
        type: 'error',
      }));
    }
    
    if (isSuccess) {
      dispatch(showNotification({
        message: '성공적으로 처리되었습니다.',
        type: 'success',
      }));
    }
    
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);
  
  const handleRegister = async (userData) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };
  
  const handleLogin = async (userData) => {
    try {
      await dispatch(login(userData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const handleUpdateProfile = async (userData) => {
    try {
      await dispatch(updateProfile(userData)).unwrap();
      dispatch(showNotification({
        message: '프로필이 성공적으로 업데이트되었습니다.',
        type: 'success',
      }));
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: isLoading || loading,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 