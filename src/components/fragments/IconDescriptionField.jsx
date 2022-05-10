import * as React from 'react';

const IconDescriptionField = ({ icon, text }) => (
  <div className="d-flex text-muted film__badge-item">
    <span className="me-1">{icon}</span>
    <p>
      <small>{text}</small>
    </p>
  </div>
);

export default IconDescriptionField;
