import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import './Header.css';

export default class Header extends React.Component {
  render() {
    return (
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Tabs>
          <Tab label="File" />
          <Tab label="Edit" />
          <Tab label="Help" />
        </Tabs>
      </Box>
    );
  }
}
