/* eslint-disable react/prop-types */
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

const ObdMetrics = ({ displayedMetrics, obdData, formatLabel, getFormattedValue, handleOpenModal }) => (
  <Grid container spacing={2} className="obd-data-container">
    {displayedMetrics.map((metric) => (
      <Grid item xs={12} sm={6} md={4} key={metric}>
        <Card className="obd-data-card">
          <CardContent>
            <Typography variant="body2" className="obd-data-label">
              {formatLabel(metric)}
            </Typography>
            <Typography variant="h6" className="obd-data-value">
              {getFormattedValue(metric, obdData[metric])}
            </Typography>
            <IconButton className="obd-metric-info-button" onClick={() => handleOpenModal(metric)} aria-label={`info about ${metric}`}>
              <InfoIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default ObdMetrics;
