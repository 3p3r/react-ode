import { createShell } from "shelljs-core";
import stringArgv from "string-argv";

export function register(terminal) {
  const ignore = ["exit", "error", "ShellString", "env", "config"];
  const shelljs = createShell({
    fs: require("memfs"),
    os: require("os-browserify/browser"),
    path: require("path-browserify"),
    util: require("util/"),
    process: require("process/browser"),
    console,
  });
  Object.keys(shelljs)
    .filter((cmd) => !ignore.includes(cmd))
    .forEach((cmd) => {
      terminal.command(cmd, async (shell, args, orgOpts) => {
        const argv = stringArgv(terminal.currentLine());
        const res = shelljs[cmd].apply(null, argv.slice(1));
        shell.printLine(res.stderr || res.stdout);
      });
    });
}
