import React from 'react';
/**
 * @category Components
 * @module Card
 * @memberof Components
 * @description Компонент картки
 */
/**
 * Картка з заголовком та вмістом.
 * Використовується для групування пов'язаного контенту.
 * @param {string} [title] - Заголовок картки
 * @param {React.ReactNode} children - Вміст картки
 * @returns {JSX.Element} Елемент картки
 */
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