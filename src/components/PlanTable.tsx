import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DevicePlan } from '../deviceGalleryMockData';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 400,
  '&::-webkit-scrollbar': {
    width: 8
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100]
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: 4
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.grey[100],
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(2)
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50]
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}08`
  },
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

const PriceCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontSize: '1rem'
}));

interface PlanTableProps {
  plans: DevicePlan[];
}

const PlanTable: React.FC<PlanTableProps> = ({ plans }) => {
  return (
    <StyledTableContainer>
      <Table stickyHeader>
        <StyledTableHead>
          <TableRow>
            <TableCell>Bundles</TableCell>
            <TableCell>Benefits</TableCell>
            <TableCell>Validity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {plans.map((plan, index) => (
            <StyledTableRow key={index}>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {plan.bundle}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {plan.benefits}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {plan.validity}
                </Typography>
              </TableCell>
              <PriceCell>
                KES {plan.price.toLocaleString()}
              </PriceCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default PlanTable;