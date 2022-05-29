import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Resizable } from 're-resizable';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Console, ConsoleTabs, Editor, EditorTabs, Explorer, Header, Nav, Status } from './workspace';
import ReactResizeDetector from 'react-resize-detector';

const theme = createTheme({
  palette: { mode: 'dark' },
  typography: { fontFamily: ['monospace'] },
});

const styles = {
  root: css({ display: 'flex', flexDirection: 'column', border: 0, margin: 0, padding: 0 }),
  border: css({ border: '1px solid #000', boxSizing: 'border-box' }),
  wrapper: css({ display: 'flex', overflow: 'hidden', flex: 1 }),
  wh100: css({ width: '100%', height: '100%' }),
  h100: css({ height: '100%' }),
  w100: css({ width: '100%' }),
};

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
        <div css={[styles.root, styles.border]} style={{ width: this.props.w, height: this.props.h }}>
          <div css={styles.border} style={{ height: this.props.tabSize }}>
            <Header />
          </div>
          <div css={styles.wrapper}>
            <div css={styles.border} style={{ width: this.props.navSize }}>
              <Nav />
            </div>
            <div css={styles.wrapper}>
              <ReactResizeDetector handleWidth handleHeight>
                {({ width = '100%', height = '100%', targetRef }) => (
                  <div css={styles.wrapper} ref={targetRef} style={{ width, height }}>
                    <Resizable
                      css={styles.border}
                      defaultSize={{ width: '25%', height: '100%' }}
                      maxWidth="90%"
                      minWidth="10%"
                      enable={ENABLE_RIGHT_SIDE}
                    >
                      <Explorer />
                    </Resizable>
                    <div css={styles.wh100} style={{ minWidth: '10%' }}>
                      <div css={[styles.wh100, styles.root]}>
                        <Resizable
                          defaultSize={{ height: '60%' }}
                          maxHeight="90%"
                          minHeight="10%"
                          enable={ENABLE_BOTTOM_SIDE}
                        >
                          <div css={[styles.wh100, styles.root]}>
                            <div css={[styles.w100, styles.border]} style={{ height: this.props.tabSize }}>
                              <EditorTabs />
                            </div>
                            <div css={[styles.wh100, styles.border]}>
                              <Editor />
                            </div>
                          </div>
                        </Resizable>
                        <div css={styles.h100} style={{ minHeight: '10%' }}>
                          <div css={[styles.wh100, styles.root]}>
                            <div css={[styles.w100, styles.border]} style={{ height: this.props.tabSize }}>
                              <ConsoleTabs />
                            </div>
                            <div css={[styles.wh100, styles.border]}>
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
          <div css={styles.border} style={{ height: this.props.tabSize }}>
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
