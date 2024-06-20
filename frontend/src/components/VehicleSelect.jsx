/* eslint-disable react/prop-types */
import { CardContent, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { StyledCard, StyledButton } from './StyledComponents';

const VehicleSelect = ({ vehicles, selectedVehicle, handleVehicleChange, obdStatus, connectObd, disconnectObd }) => (
  <StyledCard variant="outlined" className="vehicle-card">
    <CardContent>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="vehicle-select-label">Select Vehicle</InputLabel>
        <Select
          labelId="vehicle-select-label"
          id="vehicle-select"
          value={selectedVehicle}
          onChange={handleVehicleChange}
          label="Select Vehicle"
          className="vehicle-select"
        >
          {vehicles.map((vehicle) => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.license_plate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedVehicle && (
        <Box mt={2}>
          <Typography variant="h6">
            {vehicles.find((vehicle) => vehicle.id === selectedVehicle).make}{' '}
            {vehicles.find((vehicle) => vehicle.id === selectedVehicle).model} (
            {vehicles.find((vehicle) => vehicle.id === selectedVehicle).year})
          </Typography>
          <Typography variant="body2">
            {vehicles.find((vehicle) => vehicle.id === selectedVehicle).license_plate}
          </Typography>
          <Box mt={2} display="flex" justifyContent="center" id="obd-buttons">
            <StyledButton variant="contained" onClick={connectObd} disabled={obdStatus} className="connect-button obd-button">
              Connect OBD
            </StyledButton>
            <StyledButton variant="contained" onClick={disconnectObd} disabled={!obdStatus} className="disconnect-button obd-button" color="error">
              Disconnect OBD
            </StyledButton>
          </Box>
        </Box>
      )}
    </CardContent>
  </StyledCard>
);

export default VehicleSelect;
