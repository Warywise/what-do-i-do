import React from 'react';
import HeaderImg from '../assets/whatdoheader.png';

const Header: React.FC = () => {

  return (
    <header className="header">
      <h1>
        <img src={HeaderImg} alt='what do I do' />
        <i className="header-question">?</i>
      </h1>
    </header>
  );
};

export default Header;
