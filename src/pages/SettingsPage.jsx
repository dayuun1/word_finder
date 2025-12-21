import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Title from '../components/Title';
import Card from '../components/Card';
import Button from '../components/Button';
import { settingsSchema } from '../utils/validationSchema';
import styles from './SettingsPage.module.css';

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
  const navigate = useNavigate();
  const { userId } = useParams();
  
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
    <div className={styles.page}>
      <Title text="Налаштування Гри" type="h1" />
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsForm}>
        <Card title="Мова">
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Оберіть мову інтерфейсу та слів:</label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className={styles.radioOptions}>
                  {languageOptions.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
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
            {errors.language && <span className={styles.errorMessage}>{errors.language.message}</span>}
          </div>
        </Card>

        <Card title="Складність та Слова">
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Розмір сітки:</label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <div className={styles.radioOptions}>
                  {difficultyOptions.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
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
            {errors.difficulty && <span className={styles.errorMessage}>{errors.difficulty.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Максимальна довжина слова:</label>
            <Controller
              name="maxWordLength"
              control={control}
              render={({ field }) => (
                <input 
                  type="number" 
                  className={styles.appInput}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            {errors.maxWordLength && <span className={styles.errorMessage}>{errors.maxWordLength.message}</span>}
          </div>
        </Card>
        
        <Card title="Тема та Режим">
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Тема (Колір сторінки/поля):</label>
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <div className={styles.radioOptions}>
                  {themeOptions.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
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
            {errors.theme && <span className={styles.errorMessage}>{errors.theme.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Режим гри:</label>
            <Controller
              name="gameMode"
              control={control}
              render={({ field }) => (
                <div className={styles.radioOptions}>
                  {gameModeOptions.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
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
            {errors.gameMode && <span className={styles.errorMessage}>{errors.gameMode.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Ліміт часу (секунди):</label>
            <Controller
              name="timeLimit"
              control={control}
              render={({ field }) => (
                <input 
                  type="number" 
                  className={styles.appInput}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            {errors.timeLimit && <span className={styles.errorMessage}>{errors.timeLimit.message}</span>}
          </div>
        </Card>
        
        <div className={styles.formActions}>
          <Button type="submit" styleType="primary">Зберегти налаштування</Button>
          <Button type="button" onClick={() => navigate(`/user/${userId}`)} styleType="secondary">
            Повернутися на Головну
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;