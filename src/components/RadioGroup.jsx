import React from 'react';

/**
 * @fileoverview Компонент радіо-кнопок
 * @module components/RadioGroup
 */

/**
 * @typedef {Object} RadioOption
 * @property {string} value - Значення опції
 * @property {string} label - Текст опції
 */

/**
 * Група радіо-кнопок для вибору одного значення з переліку.
 * @param {string} label - Заголовок групи
 * @param {RadioOption[]} options - Масив доступних опцій
 * @param {string} selected - Поточно вибране значення
 * @param {Function} onSelect - Обробник вибору опції
 * @returns {JSX.Element} Група радіо-кнопок
 */
const RadioGroup = ({ label, options, selected, onSelect }) => {
  return (
    <div className="radio-group-container">
      <h4>{label}</h4>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              value={option.value}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;