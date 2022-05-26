import React from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';

export default class Editor extends React.Component {
  render() {
    return (
      <MonacoEditor
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// react-ode"
      />
    );
  }
}
