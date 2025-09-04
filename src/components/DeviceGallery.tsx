import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack
} from '@mui/material';
import DeviceCard from './DeviceCard';
import DeviceModal from './DeviceModal';
import { Device } from '../deviceGalleryMockData';
import { mockDevices } from '../deviceGalleryMockData';

const DeviceGallery: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBrowsePlans = (device: Device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const handleBuyNow = (device: Device) => {
    const deviceName = device.price 
      ? `${device.name} - KES ${device.price.toLocaleString()}`
      : device.name;
    
    const whatsappUrl = `https://wa.me/254740066232?text=I want to purchase ${encodeURIComponent(deviceName)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box sx={{ py: 10, background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <Container maxWidth="xl">
        <Stack spacing={8}>
          {/* Header */}
          <Box textAlign="center">
            <Typography variant="h2" gutterBottom>
              Our Device Collection
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Premium connectivity devices designed for every need, from outdoor installations to portable solutions
            </Typography>
          </Box>

          {/* Device Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3
            }}
          >
            {mockDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onBrowsePlans={() => handleBrowsePlans(device)}
                onBuyNow={() => handleBuyNow(device)}
              />
            ))}
          </Box>
        </Stack>
      </Container>

      {/* Device Modal */}
      <DeviceModal
        device={selectedDevice}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default DeviceGallery;