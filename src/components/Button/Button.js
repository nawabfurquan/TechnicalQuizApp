import React from 'react';

const Button = ({ text, className, onClick }) => {
  return (
    <button className={className} onClick={onClick} data-testid="button">
      {text}
    </button>
  );
};

export default Button;
