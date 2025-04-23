import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              ShareKnowledge
            </Typography>
            <Typography variant="body2" color="text.secondary">
              모두와 함께 지식을 나누고 성장하는 공간입니다.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              바로가기
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              홈
            </Link>
            <Link component={RouterLink} to="/contents" color="inherit" display="block" sx={{ mb: 1 }}>
              지식 공유
            </Link>
            <Link component={RouterLink} to="/popular" color="inherit" display="block" sx={{ mb: 1 }}>
              인기 컨텐츠
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              문의하기
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              정책
            </Typography>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              이용약관
            </Link>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              개인정보처리방침
            </Link>
            <Link component={RouterLink} to="/rules" color="inherit" display="block" sx={{ mb: 1 }}>
              커뮤니티 가이드라인
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ShareKnowledge. All rights reserved.
          </Typography>
          <Box>
            <Link href="https://github.com/shareknowledge" color="inherit" sx={{ ml: 2 }}>
              GitHub
            </Link>
            <Link href="https://twitter.com/shareknowledge" color="inherit" sx={{ ml: 2 }}>
              Twitter
            </Link>
            <Link href="https://facebook.com/shareknowledge" color="inherit" sx={{ ml: 2 }}>
              Facebook
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 