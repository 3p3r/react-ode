import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExtensionIcon from '@mui/icons-material/Extension';

export default class Nav extends React.Component {
  render() {
    return (
      <Box className="ode-wh-100" sx={{ bgcolor: 'background.paper' }}>
        <Stack spacing={2}>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span">
              <FileCopyIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span">
              <ExtensionIcon />
            </IconButton>
          </Paper>
        </Stack>
      </Box>
    );
  }
}
