import React from 'react';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import directoryTree from '../utils/directory-tree';
import fs from 'memfs';
import TreeItem from '@mui/lab/TreeItem';
import { css } from '@emotion/react';

const styles = css`
  height: 100%;
`;

export default class Explorer extends React.Component {
  componentDidMount() {
    this.createInitialTree();
  }

  createInitialTree = () => {
    if (fs.existsSync('/app')) fs.rmdirSync('/app', { recursive: true, force: true });
    fs.mkdirSync('/app');
    fs.mkdirSync('/app/assets');
    fs.writeFileSync('/app/assets/sample.js', '', 'utf8');
    fs.writeFileSync('/app/assets/sample.py', '', 'utf8');
    fs.writeFileSync('/app/assets/sample.css', '', 'utf8');
    fs.writeFileSync('/app/sample.html', '<DOCTYPE html5>', 'utf8');
  };

  buildFileTree = () => {
    const _addJsx = (item, path) =>
      (item.jsx = (children) => (
        <TreeItem key={path} nodeId={path} label={item.name}>
          {children}
        </TreeItem>
      ));
    const tree = directoryTree('/app', {}, _addJsx, _addJsx);
    const mapper = (node) => (node ? node.jsx(node.children && node.children.map(mapper)) : null);
    return (
      <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
        {mapper(tree)}
      </TreeView>
    );
  };

  render() {
    return (
      <Box css={styles} sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        {this.buildFileTree()}
      </Box>
    );
  }
}
