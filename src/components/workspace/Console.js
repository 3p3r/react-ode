import _ from 'lodash';
import React from 'react';
import assert from 'assert';
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
  display: block;
  background: #000;

  .xterm .xterm-viewport {
    overflow-y: hidden !important;
  }
`;

export default class Console extends React.Component {
  state = {
    /** @type {XtermJSShell} */
    shell: null,
    /** @type {Terminal} */
    terminal: null,
  };

  handleConsoleData = (data) => {
    assert.ok(this.state.shell);
    assert.ok(_.isString(data));
    // this api prints into xterm
    this.state.shell.printLine(data);
  };

  handleConsoleRef = (el) => {
    if (!el) return this.cleanup();
    const terminal = new Terminal({ cursorBlink: true });
    // XtermJSShell uses eventemitter api, here we do a conversion
    terminal.listeners = [];
    terminal.on = (name, ...args) => {
      const listener = terminal[`on${_.capitalize(name)}`](...args);
      terminal.listeners.push(listener);
    };
    terminal.off = () => {
      for (let listener of terminal.listeners) {
        listener.dispose();
      }
      terminal.listeners = [];
    };
    // XtermJSShell is older than our xterm and needs some patches
    const shell = new XtermJSShell(terminal);
    // redirect cash-money's virtual console to xterm (todo: cleanup?)
    logger.on('log', this.handleConsoleData);
    // we hook into where XtermJSShell reads lines and save the last one
    let lastLine = '';
    const read = shell.echo.read.bind(shell.echo);
    shell.echo.read = async (...args) => {
      const line = await read(...args);
      lastLine = line;
      return line;
    };
    // we hook into XtermJSShell and pass stuff it does not recognize to cash-money
    const run = shell.run.bind(shell);
    shell.run = async (command, args, flags) => {
      if (!shell.commands.has(command)) {
        // this is our "busybox" environment
        await cash(lastLine);
      } else {
        // this is everything registered with XtermJSShell's api
        // documented in node_modules/xterm-js-shell/README.md
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

  cleanup() {
    if (this.state.shell) {
      logger.off('log', this.handleConsoleData);
      this.state.shell.detach();
      this.setState({ shell: null });
    }
    if (this.state.terminal) {
      this.state.terminal.dispose();
      this.setState({ terminal: null });
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  render() {
    const padding = 5;
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
