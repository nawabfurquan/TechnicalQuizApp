import React from 'react';
import loading_gif from '../../assets/images/icegif_loading.gif';

const Loader = () => {
  return (
    <div className="container">
      <img src={loading_gif} alt="Loading..." width={300} />
    </div>
  );
};

export default Loader;
