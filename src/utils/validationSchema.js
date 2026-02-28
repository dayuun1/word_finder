
import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
  language: yup
    .string()
    .oneOf(['ukr', 'eng'], 'Оберіть мову')
    .required("Мова є обов'язковою"),
  
  difficulty: yup
    .string()
    .oneOf(['5x5', '10x10', '15x15'], 'Оберіть складність')
    .required("Складність є обов'язковою"),
  
  theme: yup
    .string()
    .oneOf(['default', 'dark', 'different'], 'Оберіть тему')
    .required("Тема є обов'язковою"),
  
  gameMode: yup
    .string()
    .oneOf(['classic', 'time'], 'Оберіть режим')
    .required("Режим гри є обов'язковим"),
  
  timeLimit: yup
    .number()
    .min(10, 'Мінімум 10 секунд')
    .max(600, 'Максимум 600 секунд')
    .required("Ліміт часу є обов'язковим"),
  
  maxWordLength: yup
    .number()
    .min(3, 'Мінімум 3 літери')
    .max(15, 'Максимум 15 літер')
    .required("Максимальна довжина слова є обов'язковою"),
  
});