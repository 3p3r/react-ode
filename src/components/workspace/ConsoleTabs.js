import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import './ConsoleTabs.css';

export default class ConsoleTabs extends React.Component {
  render() {
    return (
      <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
        <Tabs>
          <Tab label="problems" />
          <Tab label="output" />
          <Tab label="debug console" />
          <Tab label="terminal" />
        </Tabs>
      </Box>
    );
  }
}
