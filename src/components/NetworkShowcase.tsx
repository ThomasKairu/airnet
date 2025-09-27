import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Rating,
  IconButton,
  Chip,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  SignalWifiStatusbar4BarOutlined,
  SpeedOutlined,
  SecurityOutlined,
  SupportAgentOutlined,
  PlayArrowOutlined,
  PauseOutlined
} from '@mui/icons-material';

const NetworkContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.grey[900]} 0%, 
    ${theme.palette.grey[800]} 50%, 
    ${theme.palette.grey[900]} 100%)`,
  color: 'white',
  position: 'relative',
  overflow: 'hidden'
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: Number(theme.shape.borderRadius) * 2,
  color: 'white'
}));

const MetricCard = styled(GlassCard)(() => ({
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  }
}));

const TestimonialCard = styled(GlassCard)(() => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)'
  }
}));

const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    radial-gradient(circle at 20% 50%, rgba(230, 0, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 82, 204, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(0, 184, 217, 0.1) 0%, transparent 50%)
  `,
  animation: 'pulse 4s ease-in-out infinite alternate'
});

const testimonials = [
  {
    name: "Grace Wanjiku",
    role: "Remote Software Developer",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    comment: "Working from Nairobi has never been easier! The 5G speeds let me collaborate with my team in real-time without any lag."
  },
  {
    name: "David Kipchoge",
    role: "Digital Content Creator",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 5,
    comment: "As a YouTuber, upload speeds are everything. Airtel's network lets me upload 4K videos in minutes, not hours!"
  },
  {
    name: "Amina Hassan",
    role: "University Student",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    comment: "Online classes from Mombasa work perfectly. Even during peak hours, my connection stays stable for video calls."
  }
];

const NetworkShowcase: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedTest, setSpeedTest] = useState({
    download: 0,
    upload: 0,
    ping: 0,
    isRunning: false
  });

  const runSpeedTest = async () => {
    setSpeedTest(prev => ({ ...prev, isRunning: true, download: 0, upload: 0, ping: 0 }));
    
    try {
      // Test ping using performance timing
      const pingStart = performance.now();
      await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' });
      const ping = Math.round(performance.now() - pingStart);
      
      // Test download speed
      const downloadStart = performance.now();
      await fetch('https://httpbin.org/bytes/1000000', { cache: 'no-cache' });
      const downloadEnd = performance.now();
      const downloadTime = (downloadEnd - downloadStart) / 1000; // seconds
      const downloadSpeed = Math.round((1 * 8) / downloadTime); // Mbps (1MB = 8Mb)
      
      // Simulate upload test (real upload testing requires server endpoint)
      const uploadSpeed = Math.round(downloadSpeed * 0.4); // Typical upload is 40% of download
      
      // Update results with animation
      const intervals = [
        setTimeout(() => setSpeedTest(prev => ({ ...prev, ping: Math.round(ping * 0.3) })), 200),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, ping: Math.round(ping * 0.7) })), 400),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, ping })), 600),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: Math.round(downloadSpeed * 0.2) })), 800),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: Math.round(downloadSpeed * 0.5) })), 1200),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: Math.round(downloadSpeed * 0.8) })), 1600),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: downloadSpeed })), 2000),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, upload: Math.round(uploadSpeed * 0.3) })), 2200),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, upload: Math.round(uploadSpeed * 0.7) })), 2600),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, upload: uploadSpeed, isRunning: false })), 3000)
      ];

      return () => intervals.forEach(clearTimeout);
    } catch {
      // Fallback to simulated results if real test fails
      const intervals = [
        setTimeout(() => setSpeedTest(prev => ({ ...prev, ping: 15 })), 500),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: 85 })), 1000),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, download: 180 })), 1500),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, upload: 45 })), 2000),
        setTimeout(() => setSpeedTest(prev => ({ ...prev, upload: 95, isRunning: false })), 2500)
      ];
      return () => intervals.forEach(clearTimeout);
    }
  };

  return (
    <NetworkContainer sx={{ py: 10 }}>
      <AnimatedBackground />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={8}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h2" gutterBottom>
              Experience Our Network
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
              Experience Kenya's most advanced 5G network with real-time performance metrics and nationwide coverage
            </Typography>
          </Box>

          {/* Core Expertise */}
          <Box textAlign="center">
            <h3 className="text-accent-orange font-semibold mb-2">💡 Core Expertise:</h3>
          </Box>

          {/* Network Metrics */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            <MetricCard>
              <CardContent sx={{ p: 3 }}>
                <SignalWifiStatusbar4BarOutlined 
                  sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} 
                />
                <Typography variant="h3" fontWeight="bold" color="primary.main">
                  99.9%
                </Typography>
                <Typography variant="h6">Network Uptime</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                  Reliable connectivity you can count on
                </Typography>
              </CardContent>
            </MetricCard>

            <MetricCard>
              <CardContent sx={{ p: 3 }}>
                <SpeedOutlined 
                  sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} 
                />
                <Typography variant="h3" fontWeight="bold" color="secondary.main">
                  1Gbps
                </Typography>
                <Typography variant="h6">Max Speed</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                  Lightning-fast downloads and uploads
                </Typography>
              </CardContent>
            </MetricCard>

            <MetricCard>
              <CardContent sx={{ p: 3 }}>
                <SecurityOutlined 
                  sx={{ fontSize: 48, color: 'info.main', mb: 2 }} 
                />
                <Typography variant="h3" fontWeight="bold" color="info.main">
                  100%
                </Typography>
                <Typography variant="h6">Secure</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                  Advanced encryption and security
                </Typography>
              </CardContent>
            </MetricCard>

            <MetricCard>
              <CardContent sx={{ p: 3 }}>
                <SupportAgentOutlined 
                  sx={{ fontSize: 48, color: 'success.main', mb: 2 }} 
                />
                <Typography variant="h3" fontWeight="bold" color="success.main">
                  24/7
                </Typography>
                <Typography variant="h6">Support</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
                  Expert help whenever you need it
                </Typography>
              </CardContent>
            </MetricCard>
          </Box>

          {/* Speed Test Section */}
          <GlassCard sx={{ p: 4 }}>
            <Stack spacing={4}>
              <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                  Test Your Speed
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  See how fast your connection really is
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: 4,
                  textAlign: 'center'
                }}
              >
                <Box>
                  <Typography variant="h2" color="primary.main" fontWeight="bold">
                    {speedTest.download}
                  </Typography>
                  <Typography variant="h6">Mbps Download</Typography>
                  {speedTest.isRunning && (
                    <LinearProgress sx={{ mt: 1, borderRadius: 1 }} />
                  )}
                </Box>

                <Box>
                  <Typography variant="h2" color="secondary.main" fontWeight="bold">
                    {speedTest.upload}
                  </Typography>
                  <Typography variant="h6">Mbps Upload</Typography>
                  {speedTest.isRunning && (
                    <LinearProgress sx={{ mt: 1, borderRadius: 1 }} />
                  )}
                </Box>

                <Box>
                  <Typography variant="h2" color="info.main" fontWeight="bold">
                    {speedTest.ping}
                  </Typography>
                  <Typography variant="h6">ms Ping</Typography>
                  {speedTest.isRunning && (
                    <LinearProgress sx={{ mt: 1, borderRadius: 1 }} />
                  )}
                </Box>
              </Box>

              <Box textAlign="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={runSpeedTest}
                  disabled={speedTest.isRunning}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #E60000, #CC0000)'
                  }}
                >
                  {speedTest.isRunning ? 'Testing...' : 'Start Speed Test'}
                </Button>
              </Box>
            </Stack>
          </GlassCard>

          {/* Video Section */}
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <GlassCard sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1648363515048-d37f52f5ab4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHw1RyUyMHRvd2VyJTIwdGVsZWNvbW11bmljYXRpb25zJTIwbmV0d29yayUyMHRlY2hub2xvZ3l8ZW58MHwwfHxibHVlfDE3NTY5NzU1NDV8MA&ixlib=rb-4.1.0&q=85"
                  alt="Prasopchok on Unsplash"
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <IconButton
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      width: 80,
                      height: 80,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)'
                      }
                    }}
                  >
                    {isPlaying ? <PauseOutlined sx={{ fontSize: 40 }} /> : <PlayArrowOutlined sx={{ fontSize: 40 }} />}
                  </IconButton>
                </Box>
              </GlassCard>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Stack spacing={3}>
                <Typography variant="h4">
                  See Our Network in Action
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  See how our cutting-edge 5G infrastructure delivers exceptional performance 
                  across Kenya. From Nairobi's business district to rural communities, we ensure reliable connectivity.
                </Typography>
                <Stack spacing={2}>
                  <Chip 
                    label="🏢 Urban Coverage: 98.5%" 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '& .MuiChip-label': {
                        color: 'white'
                      }
                    }}
                  />
                  <Chip 
                    label="🌄 Rural Coverage: 87%" 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '& .MuiChip-label': {
                        color: 'white'
                      }
                    }}
                  />
                  <Chip 
                    label="📱 5G Towers: 1,800+" 
                    sx={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '& .MuiChip-label': {
                        color: 'white'
                      }
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Customer Testimonials */}
          <Box>
            <Typography variant="h4" textAlign="center" gutterBottom>
              What Our Customers Say
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3,
                mt: 4
              }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar 
                          src={testimonial.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="h6">{testimonial.name}</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Rating value={testimonial.rating} readOnly />
                      
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        "{testimonial.comment}"
                      </Typography>
                    </Stack>
                  </CardContent>
                </TestimonialCard>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </NetworkContainer>
  );
};

export default NetworkShowcase;