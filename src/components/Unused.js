import React from 'react';
import PropTypes from 'prop-types';

export default function Unused({ label, backgroundColor }) {
  return <button style={backgroundColor && { backgroundColor }}>{label}</button>;
}

Unused.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Unused.defaultProps = {
  backgroundColor: null,
};
