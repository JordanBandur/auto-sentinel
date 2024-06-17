import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const VehicleCard = ({ vehicle, handleEdit, handleDelete }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{vehicle.make} {vehicle.model} ({vehicle.year})</Typography>
      <Typography variant="body2">{vehicle.license_plate}</Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary" onClick={() => handleEdit(vehicle)}>Edit</Button>
      <Button variant="contained" color="error" onClick={() => handleDelete(vehicle.id)}>Delete</Button>
    </CardActions>
  </Card>
);

export default VehicleCard;
