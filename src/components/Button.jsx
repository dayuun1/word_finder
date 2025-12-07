import React from 'react';

const Button = ({ children, onClick, styleType = 'primary' }) => {
  return (
    <button 
      className={`app-button ${styleType}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;