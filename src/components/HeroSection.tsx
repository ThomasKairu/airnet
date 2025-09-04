import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack,
  Paper,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  ArrowForwardOutlined,
  PlayArrowOutlined
} from '@mui/icons-material';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}15 0%, 
    ${theme.palette.secondary.main}10 50%, 
    ${theme.palette.info.main}08 100%)`,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center'
}));

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: `calc(${theme.shape.borderRadius}px * 2)`,
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`,
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }
  }
}));


const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Experience 5G Like Never Before",
      subtitle: "Ultra-fast speeds, seamless connectivity, unlimited possibilities",
      cta: "Explore Plans",
      image: "/images/hero-family.jpg",
      stats: { speed: "1Gbps", coverage: "99%", users: "10M+" }
    },
    {
      title: "Smart Home, Smarter Living",
      subtitle: "Connect every device with our premium home internet solutions",
      cta: "Get Started",
      image: "/images/carosel4.jpeg",
      stats: { devices: "50+", uptime: "99.9%", support: "24/7" }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <HeroContainer>
      {/* Floating Background Elements */}
      <FloatingElement 
        sx={{ 
          top: '10%', 
          left: '10%', 
          width: 80, 
          height: 80,
          animationDelay: '0s'
        }} 
      />
      <FloatingElement 
        sx={{ 
          top: '60%', 
          right: '15%', 
          width: 120, 
          height: 120,
          animationDelay: '2s'
        }} 
      />
      <FloatingElement 
        sx={{ 
          bottom: '20%', 
          left: '20%', 
          width: 60, 
          height: 60,
          animationDelay: '4s'
        }} 
      />

      <Container maxWidth="xl">
        <Stack 
          direction={{ xs: 'column', lg: 'row' }} 
          spacing={6} 
          alignItems="center"
          sx={{ minHeight: '80vh' }}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1, zIndex: 2 }}>
            <Stack spacing={4}>
              {/* Logo */}
              <Box sx={{ alignSelf: 'flex-start' }}>
                <img src="/images/logo.jpg" alt="Airtelnet Logo" style={{ height: '40px' }} />
              </Box>

              {/* Main Title */}
              <Typography
                variant="h1"
                sx={{
                  background: `linear-gradient(135deg, ${(theme) => theme.palette.primary.main}, ${(theme) => theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  maxWidth: 600
                }}
              >
                airtelnet
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 500, fontWeight: 400 }}
              >
                {currentSlideData.subtitle}
              </Typography>

              {/* Stats */}
              <Stack direction="row" spacing={4} sx={{ py: 2 }}>
                {Object.entries(currentSlideData.stats).map(([key, value]) => (
                  <Box key={key} textAlign="center">
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textTransform="capitalize">
                      {key}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* CTAs */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardOutlined />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: '0 8px 24px rgba(230, 0, 0, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(230, 0, 0, 0.4)'
                    }
                  }}
                >
                  {currentSlideData.cta}
                </Button>
                
                <IconButton
                  size="large"
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  <PlayArrowOutlined />
                </IconButton>
              </Stack>
            </Stack>
          </Box>

          {/* Right Content - Image */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <GlassCard sx={{ position: 'relative', overflow: 'hidden', p: 0, height: 500 }}>
              <Box
                component="img"
                src={currentSlideData.image}
                alt="Airtel family enjoying connectivity"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            </GlassCard>
          </Box>
        </Stack>

        {/* Slide Indicators */}
        <Stack 
          direction="row" 
          spacing={1} 
          justifyContent="center" 
          sx={{ mt: 4 }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: index === currentSlide 
                  ? (theme) => theme.palette.primary.main 
                  : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
            />
          ))}
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;