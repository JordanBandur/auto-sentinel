/* eslint-disable react/prop-types */
import { Typography, CardContent } from '@mui/material';
import { StyledCard } from './StyledComponents';

const MaintenanceRecommendations = ({ recommendations }) => (
  <StyledCard className="maintenance-card">
    <CardContent>
      <Typography variant="h6" className="maintenance-title">Maintenance Recommendations</Typography>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      ) : (
        <Typography variant="body1">No recommendations as of {new Date().toLocaleString()}</Typography>
      )}
    </CardContent>
  </StyledCard>
);

export default MaintenanceRecommendations;
