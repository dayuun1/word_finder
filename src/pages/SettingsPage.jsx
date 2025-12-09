import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../components/Button';
import { settingsSchema } from '../utils/validationSchema';

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

const gameModeOptions = [
    { value: 'classic', label: 'Класичний' },
    { value: 'time', label: 'На час' }
];

const SettingsPage = ({ 
  navigate, 
  currentLang, 
  onLangChange, 
  currentDiff, 
  onDiffChange, 
  currentTheme, 
  onThemeChange,
  currentGameMode,
  onGameModeChange,
  currentTimeLimit,
  onTimeLimitChange,
  currentMaxWordLength,
  onMaxWordLengthChange,
}) => {
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      language: currentLang,
      difficulty: currentDiff,
      theme: currentTheme,
      gameMode: currentGameMode || 'classic',
      timeLimit: currentTimeLimit || 180,
      maxWordLength: currentMaxWordLength || 5,
    }
  });

  useEffect(() => {
    reset({
      language: currentLang,
      difficulty: currentDiff,
      theme: currentTheme,
      gameMode: currentGameMode || 'classic',
      timeLimit: currentTimeLimit || 180,
      maxWordLength: currentMaxWordLength || 5
    });
  }, [currentLang, currentDiff, currentTheme, currentGameMode, currentTimeLimit, currentMaxWordLength, reset]);

  const onSubmit = (data) => {
    onLangChange(data.language);
    onDiffChange(data.difficulty);
    onThemeChange(data.theme);
    onGameModeChange(data.gameMode);
    onTimeLimitChange(data.timeLimit);
    onMaxWordLengthChange(data.maxWordLength);
    
    alert('Налаштування збережено успішно!');
  };

  return (
    <div className="page settings-page">
      <Title text="Налаштування Гри" type="h1" />
      
      <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
        <Card title="Мова">
          <div className="form-group">
            <label className="form-label">Оберіть мову інтерфейсу та слів:</label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className="radio-options">
                  {languageOptions.map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.language && <span className="error-message">{errors.language.message}</span>}
          </div>
        </Card>

        <Card title="Складність та Слова">
          <div className="form-group">
            <label className="form-label">Розмір сітки:</label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <div className="radio-options">
                  {difficultyOptions.map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.difficulty && <span className="error-message">{errors.difficulty.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Максимальна довжина слова:</label>
            <Controller
              name="maxWordLength"
              control={control}
              render={({ field }) => (
                <input 
                  type="number" 
                  className="app-input"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            {errors.maxWordLength && <span className="error-message">{errors.maxWordLength.message}</span>}
          </div>
        </Card>
        
        <Card title="Тема та Режим">
          <div className="form-group">
            <label className="form-label">Тема (Колір сторінки/поля):</label>
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <div className="radio-options">
                  {themeOptions.map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.theme && <span className="error-message">{errors.theme.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Режим гри:</label>
            <Controller
              name="gameMode"
              control={control}
              render={({ field }) => (
                <div className="radio-options">
                  {gameModeOptions.map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={() => field.onChange(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.gameMode && <span className="error-message">{errors.gameMode.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Ліміт часу (секунди):</label>
            <Controller
              name="timeLimit"
              control={control}
              render={({ field }) => (
                <input 
                  type="number" 
                  className="app-input"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            {errors.timeLimit && <span className="error-message">{errors.timeLimit.message}</span>}
          </div>
        </Card>
        
        <div className="form-actions">
          <Button type="submit" styleType="primary">Зберегти налаштування</Button>
          <Button type="button" onClick={() => navigate('start')} styleType="secondary">
            Повернутися на Головну
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;