import React from 'react';

/**
 * @category Components
 * @module Title
 * @memberof Components
 * @description Компонент заголовку
 */
/**
 * Універсальний компонент заголовку.
 * Рендерить будь-який HTML-тег заголовку.
 * @param {string} text - Текст заголовку
 * @param {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} [type='h1'] - Рівень заголовку
 * @returns {JSX.Element} Елемент заголовку
 */
const Title = ({ text, type = 'h1' }) => {
  const Tag = type; 

  return (
    <Tag className={`app-title ${type}`}>
      {text}
    </Tag>
  );
};

export default Title;