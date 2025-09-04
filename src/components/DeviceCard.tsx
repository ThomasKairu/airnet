import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  VisibilityOutlined,
  ShoppingCartOutlined
} from '@mui/icons-material';
import { Device } from '../deviceGalleryMockData';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.primary.main}40`
  }
}));

const DeviceImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
}));

const FeatureList = styled(Box)(({ theme }) => ({
  '& ul': {
    margin: 0,
    paddingLeft: theme.spacing(2),
    '& li': {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      marginBottom: theme.spacing(0.5),
      color: theme.palette.text.secondary
    }
  }
}));

interface DeviceCardProps {
  device: Device;
  onBrowsePlans: () => void;
  onBuyNow: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onBrowsePlans, onBuyNow }) => {
  const formatDeviceTitle = () => {
    if (device.price) {
      return `${device.name} – KES ${device.price.toLocaleString()} ${device.freeData || ''}`;
    }
    return device.name;
  };

  return (
    <GlassCard>
      <CardContent sx={{ p: 3, height: '100%' }}>
        <Stack spacing={3} sx={{ height: '100%' }}>
          {/* Device Image */}
          <DeviceImage>
            <img src={device.image} alt={device.name} />
          </DeviceImage>

          {/* Device Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" color="primary.main" gutterBottom fontWeight="bold">
              {formatDeviceTitle()}
            </Typography>

            {/* Features */}
            <FeatureList>
              <ul>
                {device.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </FeatureList>
          </Box>

          {/* Action Buttons */}
          <Stack spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<VisibilityOutlined />}
              onClick={onBrowsePlans}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              BROWSE PLANS
            </Button>
            
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartOutlined />}
              onClick={onBuyNow}
              sx={{
                background: 'linear-gradient(135deg, #E60000, #CC0000)',
                boxShadow: '0 4px 12px rgba(230, 0, 0, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #CC0000, #B30000)',
                  boxShadow: '0 6px 16px rgba(230, 0, 0, 0.4)'
                }
              }}
            >
              Buy Now
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default DeviceCard;