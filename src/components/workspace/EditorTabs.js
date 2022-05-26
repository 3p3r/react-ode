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

export default class EditorTabs extends React.Component {
  render() {
    return (
      <Box css={styles} sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
        <Tabs>
          <Tab label="file.js" />
          <Tab label="file.css" />
          <Tab label="file.py" />
        </Tabs>
      </Box>
    );
  }
}
