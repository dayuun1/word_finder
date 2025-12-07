import React from 'react';

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