import React from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

const StartPage = ({ onStart }) => {
  return (
    <div className="page start-page">
      <Title text="Пошук Слова (Word Search 5x5)" type="h1" />
      <p className="description">
        Знайдіть заховані слова у сітці 5x5. Слова можуть бути по горизонталі, вертикалі чи діагоналі.
      </p>
      <Button onClick={onStart}>
        Почати Гру
      </Button>
    </div>
  );
};

export default StartPage;