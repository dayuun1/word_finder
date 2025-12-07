import React from 'react';
import Title from '../components/Title';
import Card from '../components/Card';
import RadioGroup from '../components/RadioGroup';
import Input from '../components/Input';
import Button from '../components/Button';

const languageOptions = [
    { value: 'ukr', label: 'Українська' },
    { value: 'eng', label: 'English' },
];

const difficultyOptions = [
    { value: '5x5', label: 'Легка (5x5)' },
    { value: '10x10', label: 'Середня (10x10)' },
    { value: '15x15', label: 'Складна (15x15)' },
];

const themeOptions = [
    { value: 'default', label: 'Стандартна' },
    { value: 'dark', label: 'Темна' },
    { value: 'different', label: 'Кольорова' },
];

const SettingsPage = ({ navigate, currentLang, onLangChange, currentDiff, onDiffChange, currentTheme, onThemeChange }) => {
  return (
    <div className="page settings-page">
      <Title text="Налаштування Гри" type="h1" />
      
      <Card title="Мова">
        <RadioGroup
          label="Оберіть мову інтерфейсу та слів:"
          options={languageOptions}
          selected={currentLang}
          onSelect={onLangChange}
        />
      </Card>

      <Card title="Складність та Слова">
        <RadioGroup
          label="Розмір сітки:"
          options={difficultyOptions}
          selected={currentDiff}
          onSelect={onDiffChange}
        />
        <Input 
            label="Максимальна довжина слова:" 
            value={8} 
            onChange={() => {}} 
            type="number"
        />
      </Card>
      
      <Card title="Тема та Режим">
        <RadioGroup
          label="Тема (Колір сторінки/поля):"
          options={themeOptions}
          selected={currentTheme}
          onSelect={onThemeChange}
        />
        <RadioGroup
          label="Режим гри:"
          options={[{ value: 'classic', label: 'Класичний' }, { value: 'time', label: 'На час' }]}
          selected={'classic'}
          onSelect={() => {}}
        />
      </Card>
      
      <Button onClick={() => navigate('start')}>Повернутися на Головну</Button>
    </div>
  );
};

export default SettingsPage;