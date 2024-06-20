/* eslint-disable react/prop-types */
import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  position: 'relative', // Ensure the card is positioned relative to position the icons absolutely
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
}));

const VehicleCard = ({ vehicle, handleEdit, handleDelete }) => (
  <StyledCard>
    <IconContainer>
      <IconButton color="primary" onClick={() => handleEdit(vehicle)}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(vehicle.id)}>
        <DeleteIcon />
      </IconButton>
    </IconContainer>
    <CardContent>
      <Typography variant="h6">{vehicle.make} {vehicle.model} ({vehicle.year})</Typography>
      <Typography variant="body2">VIN: {vehicle.vin}</Typography>
      <Typography variant="body2">License Plate: {vehicle.license_plate}</Typography>
    </CardContent>
  </StyledCard>
);

export default VehicleCard;
