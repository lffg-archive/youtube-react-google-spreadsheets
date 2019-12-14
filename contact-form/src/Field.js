import React from 'react';

export function Field({ label, name, ...props }) {
  return (
    <div>
      <label htmlFor={name}>{label}:</label> &nbsp;
      <input id={name} name={name} {...props} />
    </div>
  );
}
