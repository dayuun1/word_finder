import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ children, onClick, styleType = 'primary', disabled = false, type = 'button' }) => {
  return (
    <button 
      type={type}
      className={`${styles.appButton} ${styles[styleType]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;