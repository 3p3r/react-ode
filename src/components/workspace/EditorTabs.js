import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import './EditorTabs.css';

export default class EditorTabs extends React.Component {
  render() {
    return (
      <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
        <Tabs>
          <Tab label="file.js" />
          <Tab label="file.css" />
          <Tab label="file.py" />
        </Tabs>
      </Box>
    );
  }
}
