import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { css } from '@emotion/react';

const styles = css`
  .MuiButtonBase-root {
    min-height: 100%;
    height: 100%;
    font-size: 75%;
    line-height: 50%;
    padding: 1em;
  }
`;

export default class Header extends React.Component {
  render() {
    return (
      <Box css={styles} sx={{ bgcolor: 'background.paper' }}>
        <Tabs value={false}>
          <Tab label="File" />
          <Tab label="Edit" />
          <Tab label="Help" />
        </Tabs>
      </Box>
    );
  }
}
