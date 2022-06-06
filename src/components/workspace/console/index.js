import * as git from './git';
import * as shx from './shell';
import * as reactOde from './react-ode';
export * as addons from './addons';

export function registerApplications(shell) {
  git.register(shell);
  reactOde.register(shell);
  shx.register(shell);
}
