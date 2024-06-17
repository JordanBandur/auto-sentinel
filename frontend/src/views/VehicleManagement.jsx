import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import VehicleFormDialog from '../components/VehicleFormDialog';
import VehicleCard from '../components/VehicleCard';
import '../assets/styles/views/VehicleManagement.scss';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'create' or 'edit'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('/api/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleOpenDialog = (type, vehicle = null) => {
    setDialogType(type);
    setSelectedVehicle(vehicle);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (dialogType === 'create') {
        await axios.post('/api/vehicles', formData);
        enqueueSnackbar('Vehicle created successfully', { variant: 'success' });
      } else if (dialogType === 'edit') {
        await axios.put(`/api/vehicles/${selectedVehicle.id}`, formData);
        enqueueSnackbar('Vehicle updated successfully', { variant: 'success' });
      }
      fetchVehicles();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      enqueueSnackbar('Error saving vehicle', { variant: 'error' });
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`/api/vehicles/${vehicleId}`);
      enqueueSnackbar('Vehicle deleted successfully', { variant: 'info' });
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      enqueueSnackbar('Error deleting vehicle', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md" className="vehicle-management">
      <StyledTypography variant="h3" gutterBottom className="vehicle-management-title">Vehicle Management</StyledTypography>
      <Grid container spacing={3}>
        {vehicles.map(vehicle => (
          <Grid item xs={12} key={vehicle.id}>
            <VehicleCard vehicle={vehicle} handleEdit={() => handleOpenDialog('edit', vehicle)} handleDelete={handleDelete} />
          </Grid>
        ))}
        <Grid item xs={12} id='add-vehicle-button'>
          <StyledButton variant="contained" color="primary" onClick={() => handleOpenDialog('create')}>Add New Vehicle</StyledButton>
        </Grid>
      </Grid>

      <VehicleFormDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleSubmit={handleSubmit}
        dialogType={dialogType}
        vehicleData={selectedVehicle}
      />
    </Container>
  );
};

export default VehicleManagement;
