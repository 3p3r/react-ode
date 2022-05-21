const { javascript, web, github } = require("projen");

const projectName = 'react-ode';

const project = new javascript.NodeProject({
  name: projectName,
  description: "Online Development Environment in React",
  packageManager: javascript.NodePackageManager.NPM,
  keywords: ['react', 'monaco-editor', 'material-ui', 'ode'],
  repository: `git+https://github.com/3p3r/${projectName}.git`,
  bugsUrl: `https://github.com/3p3r/${projectName}/issue`,
  defaultReleaseBranch: "main",
  autoMerge: false,
  dependabot: true,
  dependabotOptions: {
    scheduleInterval: github.DependabotScheduleInterval.WEEKLY,
    ignore: [
      { dependencyName: 'react' },
      { dependencyName: 'react-dom' },
      { dependencyName: 'react-scripts' },
      { dependencyName: 'web-vitals' },
      { dependencyName: 'jest*' },
      { dependencyName: '@testing-library/*' },
      { dependencyName: '@types/*' },
    ]
  }
});

const component = new web.ReactComponent(project, {
  typescript: true,
});

project.synth();
