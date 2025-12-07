import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

const ResultsPage = ({ onRestart, finalScore }) => {
  return (
    <div className="page results-page">
      <Title text="Гра Завершена!" type="h1" />
      <div className="results-summary">
        <p>Ваш фінальний рахунок:</p>
        <span className="score">{finalScore}</span>
        <p className="message">Чудова робота! (Плейсхолдер)</p>
      </div>
      <Button onClick={onRestart}>
        Зіграти ще раз
      </Button>
    </div>
  );
};

export default ResultsPage;