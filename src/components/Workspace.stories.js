import React from 'react';
import Workspace from './Workspace';

export default {
  title: 'ReactODE/Workspace',
  component: Workspace,
};

const Template = (args) => <Workspace {...args} />;
export const Default = Template;

Default.args = {
  w: 1024,
  h: 680,
  navSize: 40,
  tabSize: 25,
};
