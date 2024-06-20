import { styled } from '@mui/system';
import { Card, Button, Typography, Dialog } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  flex: '1 0 21%',
  minHeight: '140px',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledDialog = styled(Dialog)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiDialog-paper': {
    width: '80%',
    maxWidth: '800px',
  },
}));
