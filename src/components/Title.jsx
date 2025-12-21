import React from 'react';
import styles from './Title.module.css';

const Title = ({ text, type = 'h1' }) => {
  const Tag = type; 

  return (
    <Tag className={`${styles.appTitle} ${styles[type]}`}>
      {text}
    </Tag>
  );
};

export default Title;