import React from 'react';
import error_icon from '../../assets/images/error-icon.png';

const ErrorMessage = ({ error }) => {
  return (
    <div className="container">
      <img src={error_icon} alt="Error" width={200} />
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
