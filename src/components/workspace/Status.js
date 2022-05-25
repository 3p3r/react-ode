import React from 'react';

export default class Status extends React.Component {
  render() {
    return <span>{this.constructor.name}</span>;
  }
}
