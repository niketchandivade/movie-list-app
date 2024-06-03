import React from 'react';
import './chip.css';

const Chip = ({ label = '', selected = false, onClick = () => {} }) => {
  return (
    <div
      className={selected ? 'selected' : 'not-selected'}
      onClick={() => onClick(!selected)}
    >
      {label}
    </div>
  );
};

export default Chip;
