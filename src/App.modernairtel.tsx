import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import theme from './theme';
import HeroSection from './components/HeroSection';
import PlanSelector from './components/PlanSelector';
import NetworkShowcase from './components/NetworkShowcase';
import DeviceGallery from './components/DeviceGallery';
import SupportHub from './components/SupportHub';
import Footer from './components/Footer';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <HeroSection />
          <Box id="plan-selector">
            <PlanSelector />
          </Box>
          <NetworkShowcase />
          <DeviceGallery />
          <SupportHub />
          <Footer />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;