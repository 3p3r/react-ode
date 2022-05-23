const path = require('path');
const projen = require('projen');

class ReactODEProject extends projen.Project {
  /** @param {projen.github.GitHubProjectOptions} options */
  constructor(options) {
    super(options);
    this.prepareDefaultTask();

    // this is where actual scaffolding happens
    const scaffolding = path.join(this.outdir, '.scaffolding');

    this.defaultTask.say('cleaning up previous runs');
    this.defaultTask.exec(
      this.script(() => {
        const fs = require('fs');
        if (fs.existsSync('.scaffolding')) fs.rmSync('.scaffolding', { recursive: true, force: true });
      })
    );

    this.defaultTask.say('creating a new razzle app');
    this.defaultTask.exec(`npx --yes create-razzle-app .scaffolding`);

    this.defaultTask.say('converting razzle app to single-page-application (SPA) mode');
    this.defaultTask.exec('rm -rf README.md src/server.js src/client.js src/index.js', { cwd: scaffolding });
    this.defaultTask.exec(
      this.script((name) => {
        // automation of https://razzlejs.org/docs/single-page-applications
        const fs = require('fs');
        const razzlePackageJson = require('./package.json');
        // does not apply to SPA mode (valid in iso mode)
        delete razzlePackageJson.scripts['start:prod'];
        razzlePackageJson.version = '1.0.0';
        razzlePackageJson.name = name;
        fs.writeFileSync('package.json', JSON.stringify(razzlePackageJson, null, 2));
      }, this.name),
      { cwd: scaffolding }
    );
    // checking in razzle  SPA mode index.html
    new projen.TextFile(this, 'public/index.html', { lines: [RAZZLE_DEFAULT_INDEX_HTML] });
    // checking in razzle configuration with SPA mode enabled
    new projen.TextFile(this, 'razzle.config.js', { lines: [RAZZLE_DEFAULT_CONFIG_JS] });

    this.defaultTask.say('installing projen');
    this.defaultTask.exec('npm install --save projen', { cwd: scaffolding });

    this.defaultTask.say('adding storybook to razzle');
    this.defaultTask.exec('npx --yes storybook init', { cwd: scaffolding });

    this.defaultTask.say('preparing to move scaffolds');
    this.defaultTask.exec('rm -rf node_modules', { cwd: scaffolding });

    this.defaultTask.say('moving scaffolds into project');
    this.defaultTask.exec('cp -rf .* .. || true >/dev/null 2>&1', { cwd: scaffolding });
    this.defaultTask.exec('cp -rf * .. || true >/dev/null 2>&1', { cwd: scaffolding });
    this.defaultTask.exec('rm -rf .scaffolding');

    this.defaultTask.say('synchronizing dependencies');
    this.defaultTask.exec('npm install');
  }

  /**
   * converts a javascript function to something "defaultTask.exec" understands.
   * @note the passed function cannot use anything outside its own scope.
   * @note there is a limit to how many characters long a function is.
   * @param {Function} func contained function logic for a exec step.
   * @param  {...string} args variadic arguments passed to "func".
   * @returns {string} something "defaultTask.exec" understands.
   */
  script = (func, ...args) =>
    `node -e "atob=i=>Buffer.from(i,'base64').toString('utf8');eval('('+atob('${this.btoa(func.toString())}')+')(${args
      .map((arg) => `\\\`'+atob('${this.btoa(arg)}')+'\\\``)
      .join(',')})')"`;

  /**
   * btoa() encodes string to base64
   * @param {string} input
   * @returns base64 encoded string
   */
  btoa = (input) => Buffer.from(input).toString('base64');

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

const RAZZLE_DEFAULT_CONFIG_JS = `\
'use strict';
module.exports = {
  options: {
    buildType: 'spa',
  }
};
`;

const RAZZLE_DEFAULT_INDEX_HTML = `\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <!--<link rel="icon" href="<%= process.env.PUBLIC_PATH %>favicon.ico" />-->
  <!-- Suppress browser request for favicon.ico -->
  <link rel="shortcut icon"type="image/x-icon" href="data:image/x-icon;,">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="theme-color" content="#000000" />
  <%= htmlWebpackPlugin.tags.headTags %>
  <title>React App</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <%= htmlWebpackPlugin.tags.bodyTags %>
</body>
</html>
`;

const projectName = 'react-ode';
const project = new ReactODEProject({
  name: projectName,
});
project.synth();
