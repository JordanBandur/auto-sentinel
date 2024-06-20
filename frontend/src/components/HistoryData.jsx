/* eslint-disable react/prop-types */
import { Grid, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Info as InfoIcon, Delete as DeleteIcon, Email as EmailIcon } from '@mui/icons-material';

const HistoryData = ({ historyData, handleOpenHistoryModal, handleDeleteHistoryEntry, handleOpenEmailModal, downloadCSV }) => (
  <Grid container spacing={2} className="history-data-container">
    {historyData.map((entry) => (
      <Grid item xs={12} key={entry.id}>
        <Card className="history-data-card">
          <CardContent>
            <Typography variant="body2">Date: {new Date(entry.created_at).toLocaleString()}</Typography>
            <IconButton className="history-metric-info-button" onClick={() => handleOpenHistoryModal(entry)} aria-label="info">
              <InfoIcon />
            </IconButton>
            <IconButton className="history-metric-delete-button" onClick={() => handleDeleteHistoryEntry(entry.id)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton className="history-metric-email-button" onClick={() => handleOpenEmailModal(entry)} aria-label="email">
              <EmailIcon />
            </IconButton>
            <Button className="download-csv-button" variant="contained" onClick={() => downloadCSV(historyData)}>
              Download CSV
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default HistoryData;
