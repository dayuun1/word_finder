import React from 'react';

const Title = ({ text, type = 'h1' }) => {
  const Tag = type; 

  return (
    <Tag className={`app-title ${type}`}>
      {text}
    </Tag>
  );
};

export default Title;