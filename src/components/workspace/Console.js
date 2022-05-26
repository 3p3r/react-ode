import React from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { WebLinksAddon } from 'xterm-addon-web-links';
import ReactResizeDetector from 'react-resize-detector';

import 'xterm/css/xterm.css';
import './Console.css';

export default class Console extends React.Component {
  state = {
    terminal: null,
  };

  handleConsoleRef = (el) => {
    if (!el) return this.setState({ terminal: null });
    const terminal = new Terminal({ cursorBlink: true, scrollback: 0 });
    terminal.open(el);
    terminal.loadAddon(new WebLinksAddon());
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    const webglAddon = new WebglAddon();
    terminal.loadAddon(webglAddon);
    webglAddon.onContextLoss((e) => {
      webglAddon.dispose();
    });
    terminal.write('react-ode $ ');
    fitAddon.activate(terminal);
    terminal.refit = () => fitAddon.fit();
    this.setState({ terminal });
    this.refit();
  };

  refit = () => {
    if (this.state.terminal) {
      this.state.terminal.refit();
      this.state.terminal.focus();
    }
  };

  render() {
    const padding = 10;
    return (
      <ReactResizeDetector handleWidth handleHeight onResize={this.refit}>
        {({ width, height, targetRef }) => (
          <div ref={targetRef} className="ode-xterm-wrapper ode-wh-100">
            <div
              ref={this.handleConsoleRef}
              style={{ width: width - padding * 2, height: height - padding * 2, padding }}
            ></div>
          </div>
        )}
      </ReactResizeDetector>
    );
  }
}
