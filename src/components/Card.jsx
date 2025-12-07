import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="app-card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;