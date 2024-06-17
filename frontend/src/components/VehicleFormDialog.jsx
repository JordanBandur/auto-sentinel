import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, FormControl } from '@mui/material';

const VehicleFormDialog = ({ open, handleClose, handleSubmit, dialogType, vehicleData }) => {
  const [formData, setFormData] = useState({ make: '', model: '', year: '', vin: '', license_plate: '' });

  useEffect(() => {
    if (vehicleData) {
      setFormData(vehicleData);
    }
  }, [vehicleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    handleSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogType === 'create' ? 'Add New Vehicle' : 'Edit Vehicle'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogType === 'create' ? 'Fill in the details to add a new vehicle.' : 'Edit the details of the vehicle.'}
        </DialogContentText>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="VIN"
            name="vin"
            value={formData.vin}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="License Plate"
            name="license_plate"
            value={formData.license_plate}
            onChange={handleInputChange}
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={onSubmit} color="primary">{dialogType === 'create' ? 'Add' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormDialog;
