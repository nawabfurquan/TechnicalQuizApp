import React from 'react';
import './Header.css';
import { HEADER_TITLE } from '../../utils/constant';

const Header = () => {
  return (
    <div className="main_header">
      <h2 style={{ textTransform: 'uppercase' }}>{HEADER_TITLE}</h2>
    </div>
  );
};

export default Header;
