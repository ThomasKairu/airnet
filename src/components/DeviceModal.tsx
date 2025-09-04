import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloseOutlined } from '@mui/icons-material';
import PlanTable from './PlanTable';
import { Device } from '../deviceGalleryMockData';
import { planCategories } from '../deviceGalleryMockData';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    maxWidth: 800,
    width: '90vw',
    maxHeight: '80vh',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)'
  }
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(135deg, #E60000 0%, #CC0000 100%)',
  color: 'white',
  borderRadius: `${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px 0 0`
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
}));

interface DeviceModalProps {
  device: Device | null;
  open: boolean;
  onClose: () => void;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ device, open, onClose }) => {
  if (!device) return null;

  const modalTitle = planCategories[device.type] || `PLANS FOR ${device.name.toUpperCase()}`;

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false}>
      <ModalHeader>
        <Typography variant="h5" fontWeight="bold">
          {modalTitle}
        </Typography>
        <CloseButton onClick={onClose} size="large">
          <CloseOutlined />
        </CloseButton>
      </ModalHeader>
      
      <DialogContent sx={{ p: 0 }}>
        <PlanTable plans={device.plans} />
      </DialogContent>
    </StyledDialog>
  );
};

export default DeviceModal;