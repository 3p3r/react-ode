import _ from 'lodash';
import React from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { WebLinksAddon } from 'xterm-addon-web-links';
import ReactResizeDetector from 'react-resize-detector';
import XtermJSShell from 'xterm-js-shell';
import { cash, console as logger } from 'react-ode-cash-money';
import { css } from '@emotion/react';

import 'xterm/css/xterm.css';

const styles = css`
  width: 100%;
  height: 100%;
  background: #000;

  .xterm .xterm-viewport {
    overflow-y: hidden !important;
  }
`;

export default class Console extends React.Component {
  state = {
    shell: null,
    terminal: null,
  };

  handleConsoleRef = (el) => {
    if (!el) return this.setState({ shell: null, terminal: null });
    const terminal = new Terminal({ cursorBlink: true, scrollback: 0 });
    terminal.on = (name, ...args) => {
      terminal[`on${_.capitalize(name)}`](...args);
    };
    const shell = new XtermJSShell(terminal);
    const run = shell.run.bind(shell);
    // todo: cleanup?
    logger.on('log', (data) => shell.printLine(`${data}`));
    const read = shell.echo.read.bind(shell.echo);
    let lastLine = '';
    shell.echo.read = async (...args) => {
      const line = await read(...args);
      lastLine = line;
      return line;
    };
    shell.run = async (command, args, flags) => {
      if (!shell.commands.has(command)) {
        await cash(lastLine);
      } else {
        return await run(command, args, flags);
      }
    };
    shell.repl();
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
    this.setState({ shell, terminal });
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
          <div ref={targetRef} css={styles}>
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
