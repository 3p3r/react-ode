import React from 'react';
import PropTypes from 'prop-types';
import { SizeMe } from 'react-sizeme';
import { Resizable } from 're-resizable';
import { Console, ConsoleTabs, Editor, EditorTabs, Explorer, Header, Nav, Status } from './workspace';

import './Workspace.css';

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
      <div className="ode-main ode-border" style={{ width: this.props.w, height: this.props.h }}>
        <div className="ode-header ode-border" style={{ height: this.props.tabSize }}>
          <Header />
        </div>
        <div className="ode-wrapper">
          <div className="ode-sidebar ode-border" style={{ width: this.props.navSize }}>
            <Nav />
          </div>
          <div className="ode-wrapper">
            <SizeMe monitorHeight>
              {({ size }) => (
                <div style={{ width: '100%', height: size.height, display: 'flex', overflow: 'hidden' }}>
                  <Resizable
                    className="ode-border"
                    defaultSize={{ width: '25%', height: '100%' }}
                    maxWidth="100%"
                    minWidth="1"
                    enable={ENABLE_RIGHT_SIDE}
                  >
                    <Explorer />
                  </Resizable>
                  <div className="ode-wh-100" style={{ minWidth: '1px' }}>
                    <div className="ode-wh-100" style={{ display: 'flex', flexDirection: 'column' }}>
                      <Resizable
                        defaultSize={{ height: '60%' }}
                        maxHeight="100%"
                        minHeight="1"
                        enable={ENABLE_BOTTOM_SIDE}
                      >
                        <div className="ode-wh-100" style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className="ode-w-100 ode-border" style={{ height: this.props.tabSize }}>
                            <EditorTabs />
                          </div>
                          <div className="ode-wh-100 ode-border">
                            <Editor />
                          </div>
                        </div>
                      </Resizable>
                      <div className="ode-h-100" style={{ minHeight: '1px' }}>
                        <div className="ode-wh-100" style={{ display: 'flex', flexDirection: 'column' }}>
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
            </SizeMe>
          </div>
        </div>
        <div className="ode-border" style={{ height: this.props.tabSize }}>
          <Status />
        </div>
      </div>
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
