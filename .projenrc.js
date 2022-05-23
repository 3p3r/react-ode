const path = require('path');
const assert = require('assert');
const projen = require('projen');

const MAX_SHELL_COMMAND_CHARACTERS = 4096 - 1; // "1" for terminating new line

class ReactODEProject extends projen.Project {
  /** @param {projen.github.GitHubProjectOptions} options */
  constructor(options) {
    super(options);
    this.prepareDefaultTask();

    // this is where actual scaffolding happens
    const scaffolding = path.join(this.outdir, 'scaffolding');

    this.defaultTask.say('cleaning up previous runs');
    this.defaultTask.exec('rm -rf scaffolding');

    this.defaultTask.say('creating a new react app');
    this.defaultTask.exec(`npx --yes create-react-app scaffolding`);

    this.defaultTask.say('preparing react app for storybook');
    this.defaultTask.exec('rm -rf README.md src public', { cwd: scaffolding });
    this.defaultTask.exec(
      this.script((name) => {
        const fs = require('fs');
        const packageJson = require('./package.json');
        packageJson.version = '1.0.0';
        packageJson.private = false;
        packageJson.files = ['dist', 'README.md'];
        packageJson.build = 'webpack --config src/webpack/webpack.config.js';
        packageJson.start = 'storybook';
        packageJson.name = name;
        packageJson.devDependencies = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        };
        packageJson.dependencies = {
          ['react']: packageJson.devDependencies['react'],
          ['react-dom']: packageJson.devDependencies['react-dom'],
        };
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
      }, this.name),
      { cwd: scaffolding }
    );

    this.defaultTask.say('adding storybook to react app');
    this.defaultTask.exec('npx --yes storybook init', { cwd: scaffolding });

    this.defaultTask.say('installing projen');
    this.defaultTask.exec('npm install --save-dev projen', { cwd: scaffolding });

    this.defaultTask.say('preparing to move scaffolds');
    this.defaultTask.exec('rm -rf node_modules', { cwd: scaffolding });

    this.defaultTask.say('moving scaffolds into project');
    this.defaultTask.exec('cp -rf .* .. || true >/dev/null 2>&1', { cwd: scaffolding });
    this.defaultTask.exec('cp -rf * .. || true >/dev/null 2>&1', { cwd: scaffolding });
    this.defaultTask.exec('rm -rf scaffolding');

    this.defaultTask.say('synchronizing dependencies');
    this.defaultTask.exec('npm install');

    this.defaultTask.say('installing webpack dependencies');
    this.defaultTask.exec(
      'npm install --save-dev webpack-cli copy-webpack-plugin clean-webpack-plugin webpack-node-externals'
    );

    this.defaultTask.say('deduping dependencies');
    this.defaultTask.exec('npm dedup');
  }

  /**
   * turns a javascript function into a shell command so it's executable in any shell.
   * @note due to shell limitations, output string cannot exceed 4095 characters.
   * @note the passed function cannot use anything outside its own scope.
   * @param {Function} func contained function logic for a exec step.
   * @param  {...string} args variadic string args passed to "func".
   * @returns {string} shell command starting with "node -e"
   */
  script = (func, ...args) => {
    const funcBody = func.toString();
    const funcEncoded = btoa(funcBody);
    const argsList = args.map((arg) => `\\\`'+atob('${btoa(arg)}')+'\\\``);
    const argsEncoded = argsList.join(',');
    const expTemplate = `node -e "atob=i=>Buffer.from(i,'base64').toString('utf8');eval('('+atob('X')+')(Y)')"`;
    const expTemplateLength = expTemplate.length - 2; // XY
    assert.ok(
      MAX_SHELL_COMMAND_CHARACTERS >= expTemplateLength + funcEncoded.length + argsEncoded.length,
      `script "${funcBody}" too large, break up your logic into smaller functions, cleanup projen and resynth.`
    );
    return expTemplate.replace("atob('X')+')(Y)", `atob('${funcEncoded}')+')(${argsEncoded})`);
  };

  /** resets the default task and makes sure projen only runs once */
  prepareDefaultTask() {
    const _packageJsonMissing = this.script(() => {
      console.log('checking for package.json...');
      const fs = require('fs');
      const ret = fs.existsSync('package.json') ? 1 : 0;
      process.exit(ret);
    });
    this.defaultTask.condition = _packageJsonMissing;
    this.defaultTask.env('STORYBOOK_DISABLE_TELEMETRY', '1');
    this.defaultTask.reset();
    // nothing is managed by projen post scaffolding
    this.tryRemoveFile('.gitattributes');
    this.tryRemoveFile('.gitignore');
  }
}

/**
 * encodes string to base64
 * @param {string} input raw input
 * @returns base64 encoded string output
 */
const btoa = (input) => Buffer.from(input).toString('base64');

const projectName = 'react-ode';
const project = new ReactODEProject({
  name: projectName,
});
project.synth();
