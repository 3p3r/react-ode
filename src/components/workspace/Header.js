import React from 'react';

export default class Header extends React.Component {
  render() {
    return <span>{this.constructor.name}</span>;
  }
}
