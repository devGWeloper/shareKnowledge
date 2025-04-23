import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ContentDetail from './pages/ContentDetail';
import CreateContent from './pages/CreateContent';
import EditContent from './pages/EditContent';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <Container component="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/content/create" element={
              <ProtectedRoute>
                <CreateContent />
              </ProtectedRoute>
            } />
            
            <Route path="/content/edit/:id" element={
              <ProtectedRoute>
                <EditContent />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App; 