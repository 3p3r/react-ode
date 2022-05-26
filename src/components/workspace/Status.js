import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import './Status.css';

export default class Status extends React.Component {
  render() {
    return (
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }} className="ode-wh-100">
        <Alert severity="info">status bar. ready.</Alert>
      </Box>
    );
  }
}
