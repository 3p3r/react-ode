import React from 'react';
import Unused from './Unused';

export default {
  title: 'Projen/Unused',
  component: Unused,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Unused {...args} />;
export const Default = Template.bind({});

Default.args = {
  label: 'unused',
};
