import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 're-resizable';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Console, ConsoleTabs, Editor, EditorTabs, Explorer, Header, Nav, Status } from './workspace';
import ReactResizeDetector from 'react-resize-detector';

import './Workspace.css';

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: { fontFamily: ['monospace'] },
});

export default class Workspace extends React.Component {
  static propTypes = {
    w: PropTypes.number,
    h: PropTypes.number,
    navSize: PropTypes.number,
    tabSize: PropTypes.number,
  };

  static defaultProps = {
    navSize: 40,
    tabSize: 15,
    w: 1024,
    h: 680,
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="ode-main ode-border" style={{ width: this.props.w, height: this.props.h }}>
          <div className="ode-header ode-border" style={{ height: this.props.tabSize }}>
            <Header />
          </div>
          <div className="ode-wrapper">
            <div className="ode-sidebar ode-border" style={{ width: this.props.navSize }}>
              <Nav />
            </div>
            <div className="ode-wrapper">
              <ReactResizeDetector handleWidth handleHeight>
                {({ width = '100%', height, targetRef }) => (
                  <div ref={targetRef} style={{ width, height, display: 'flex', overflow: 'hidden' }}>
                    <Resizable
                      className="ode-border"
                      defaultSize={{ width: '25%', height: '100%' }}
                      maxWidth="90%"
                      minWidth="10%"
                      enable={ENABLE_RIGHT_SIDE}
                    >
                      <Explorer />
                    </Resizable>
                    <div className="ode-wh-100" style={{ minWidth: '1px' }}>
                      <div className="ode-wh-100 ode-main">
                        <Resizable
                          defaultSize={{ height: '60%' }}
                          maxHeight="90%"
                          minHeight="10%"
                          enable={ENABLE_BOTTOM_SIDE}
                        >
                          <div className="ode-wh-100 ode-main">
                            <div className="ode-w-100 ode-border" style={{ height: this.props.tabSize }}>
                              <EditorTabs />
                            </div>
                            <div className="ode-wh-100 ode-border">
                              <Editor />
                            </div>
                          </div>
                        </Resizable>
                        <div className="ode-h-100" style={{ minHeight: '1px' }}>
                          <div className="ode-wh-100 ode-main">
                            <div className="ode-w-100 ode-border" style={{ height: this.props.tabSize }}>
                              <ConsoleTabs />
                            </div>
                            <div className="ode-w-100 ode-border" style={{ height: '100%' }}>
                              <Console />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ReactResizeDetector>
            </div>
          </div>
          <div className="ode-border" style={{ height: this.props.tabSize }}>
            <Status />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const DISABLE_ALL_SIDES = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};
const ENABLE_RIGHT_SIDE = { ...DISABLE_ALL_SIDES, right: true };
const ENABLE_BOTTOM_SIDE = { ...DISABLE_ALL_SIDES, bottom: true };
