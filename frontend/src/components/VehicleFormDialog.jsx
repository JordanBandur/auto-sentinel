/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, FormControl } from '@mui/material';

const VehicleFormDialog = ({ open, handleClose, handleSubmit, dialogType, vehicleData }) => {
  const [formData, setFormData] = useState({ make: '', model: '', year: '', vin: '', license_plate: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (vehicleData) {
      setFormData(vehicleData);
    }
  }, [vehicleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.vin) newErrors.vin = 'VIN is required';
    if (!formData.license_plate) newErrors.license_plate = 'License Plate is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit(formData);
    }
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
            error={!!errors.make}
            helperText={errors.make}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            error={!!errors.model}
            helperText={errors.model}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            error={!!errors.year}
            helperText={errors.year}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="VIN"
            name="vin"
            value={formData.vin}
            onChange={handleInputChange}
            error={!!errors.vin}
            helperText={errors.vin}
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="License Plate"
            name="license_plate"
            value={formData.license_plate}
            onChange={handleInputChange}
            error={!!errors.license_plate}
            helperText={errors.license_plate}
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
