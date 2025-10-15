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
    <Box id="device-gallery" sx={{ py: 10, background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
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

        {/* FAQ Section */}
        <Box sx={{ mt: 10, py: 6, backgroundColor: 'neutral.100', borderRadius: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h2" textAlign="center" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Stack spacing={3} mt={4}>
              <Box>
                <Typography variant="h6" component="h3">How to Set Up 4G Smart Connect in Kenya?</Typography>
                <Typography variant="body1" color="text.secondary">
                  Setting up your <a href="#device-gallery">4G Smart Connect</a> is simple. Just insert your Airtel SIM card, power on the device, and connect to the Wi-Fi network. No technical configuration is needed.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h3">How to improve 4G Smart Connect speeds?</Typography>
                <Typography variant="body1" color="text.secondary">
                  For optimal performance, place your router near a window and away from other electronic devices. You can also ensure your device firmware is updated through the device settings.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h3">What is the price of a 4G router in Kenya?</Typography>
                <Typography variant="body1" color="text.secondary">
                  Our <a href="#device-gallery">4G Smart Connect</a> router is available for KES 4,500 and comes with free unlimited data at 10Mbps speeds.
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Container>

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How to Set Up 4G Smart Connect in Kenya?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Setting up your 4G Smart Connect is simple. Just insert your Airtel SIM card, power on the device, and connect to the Wi-Fi network. No technical configuration is needed."
                }
              },
              {
                "@type": "Question",
                "name": "How to improve 4G Smart Connect speeds?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For optimal performance, place your router near a window and away from other electronic devices. You can also ensure your device firmware is updated through the device settings."
                }
              },
              {
                "@type": "Question",
                "name": "What is the price of a 4G router in Kenya?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our 4G Smart Connect router is available for KES 4,500 and comes with free unlimited data at 10Mbps speeds."
                }
              }
            ]
          }
        `}
      </script>

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