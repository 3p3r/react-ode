import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { css } from '@emotion/react';

const styles = {
  wrapper: css({ height: '100%' }),
  stack: css({ height: '50%' }),
};

export default class Nav extends React.Component {
  render() {
    return (
      <Box css={styles.wrapper} sx={{ bgcolor: 'background.paper' }}>
        <Stack css={styles.stack} spacing={1} direction="column" justifyContent="flex-start" alignItems="stretch">
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span">
              <FileCopyOutlinedIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span" disabled>
              <SearchOutlinedIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span" disabled>
              <ExtensionOutlinedIcon />
            </IconButton>
          </Paper>
        </Stack>
        <Stack css={styles.stack} spacing={1} direction="column" justifyContent="flex-end" alignItems="stretch">
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span" disabled>
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ textAlign: 'center' }}>
            <IconButton color="primary" component="span">
              <SettingsOutlinedIcon />
            </IconButton>
          </Paper>
        </Stack>
      </Box>
    );
  }
}
