import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/react';

const styles = css`
  width: 100%;
  height: 100%;

  .MuiPaper-root {
    padding: 0 !important;
  }
  .MuiTypography-caption {
    padding: 0 4px !important;
  }
`;

export default class Status extends React.Component {
  render() {
    return (
      <Box css={styles} sx={{ bgcolor: 'background.default', color: 'text.primary' }} justifyContent="center">
        <Typography variant="caption" display="inline-flex">
          status bar ready.
        </Typography>
      </Box>
    );
  }
}
