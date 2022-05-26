import React from 'react';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { css } from '@emotion/react';

const styles = css`
  height: 100%;
`;

export default class Explorer extends React.Component {
  render() {
    return (
      <Box css={styles} sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="public">
            <TreeItem nodeId="3" label="file.css" />
          </TreeItem>
          <TreeItem nodeId="2" label="src">
            <TreeItem nodeId="4" label="file.js" />
            <TreeItem nodeId="5" label="file.py" />
          </TreeItem>
        </TreeView>
      </Box>
    );
  }
}
