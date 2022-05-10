import * as React from 'react';

const TextDecriptionField = ({ heading, text }) => (
  <p>
    <small>
      <b>{heading}:</b>

      {` ${text}`}
    </small>
  </p>
);

export default TextDecriptionField;
