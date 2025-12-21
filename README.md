# Word Finder Game - README


## Корисні практики

### Практика № 1: Модульна архітектура та розділення відповідальності

**Опис:** У React-застосунку архітектура коду повинна ґрунтуватися на принципі модульності. Кожен модуль має нести єдину, конкретну відповідальність, що полегшує підтримку та тестування.

**Реалізація в проекті:**

- **`/components`** - переповторно використовувані UI-компоненти ([Button.jsx](src/components/Button.jsx), [Card.jsx](src/components/Card.jsx), [WordGrid.jsx](src/components/WordGrid.jsx))
- **`/pages`** - компоненти сторінок ([GamePage.jsx](src/pages/GamePage.jsx), [SettingsPage.jsx](src/pages/SettingsPage.jsx))
- **`/hooks`** - бізнес-логіка винесена в custom hooks ([useWordGrid.js](src/hooks/useWordGrid.js), [useWordSelection.js](src/hooks/useWordSelection.js))
- **`/store`** - управління глобальним станом ([useSettingsStore.js](src/store/useSettingsStore.js), [useProfileStore.js](src/store/useProfileStore.js))
- **`/constants`** - конфігурація та дані ([wordLists.js](src/constants/wordLists.js))
- **`/utils`** - допоміжні функції та схеми валідації ([validationSchema.js](src/utils/validationSchema.js))

**Переваги:**
- Легко знайти потрібний код
- Простіше тестувати окремі модулі
- Можна повторно використовувати компоненти
- Зручно працювати в команді
- Легше масштабувати проєкт

---

### Практика № 2: Композиція компонентів

**Опис:** React рекомендує композицію замість наслідування. Компоненти можна комбінувати для створення складної функціональності через props.children та передачу компонентів як props.

**Реалізація в проекті:**

[Card.jsx](src/components/Card.jsx) - універсальний контейнер, який приймає `children`:
```jsx
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
```

Використання в [SettingsPage.jsx](src/pages/SettingsPage.jsx):
```jsx
<Card title="Мова">
  <div className={styles.formGroup}>
    {/* Вміст карточки */}
  </div>
</Card>
```

[Portal.jsx](src/components/Portal.jsx) - композиція для модальних вікон через React Portals:
```jsx
const Portal = ({ children, portalId = 'portal-root' }) => {
  const portalRoot = document.getElementById(portalId);
  return createPortal(children, portalRoot);
};
```

**Переваги:**
- Гнучкість у побудові UI
- Уникнення дублювання коду
- Легке створення різних варіацій компонентів
- Чистий та зрозумілий код

---

### Практика № 3: Розділення відповідальності за допомогою Custom Hooks

**Опис:** Custom hooks дозволяють винести складну логіку зі компонентів, роблячи їх чистішими та зосередженими на відображенні UI. Кожен hook відповідає за конкретну бізнес-логіку.

**Реалізація в проекті:**

[useWordGrid.js](src/hooks/useWordGrid.js) - логіка генерації ігрової сітки:
```javascript
export const useWordGrid = (difficulty, language, maxWordLength) => {
  const [grid, setGrid] = useState([]);
  const [wordsInGrid, setWordsInGrid] = useState([]);
  const [wordPositions, setWordPositions] = useState([]);
  
  const generateGrid = useCallback(() => {
    //логіка генерації сітки
    const size = getGridSize();
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
    //розміщення слів та заповнення випадковими літерами
  }, [difficulty, language, maxWordLength]);
  
  return { grid, wordsInGrid, wordPositions, regenerateGrid: generateGrid };
};
```

[useWordSelection.js](src/hooks/useWordSelection.js) - логіка виділення та перевірки слів:
```javascript
export const useWordSelection = (grid, wordsInGrid, wordPositions) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  
  const handleCellMouseDown = (row, col) => { /* ... */ };
  const checkSelectedWord = () => { /* ... */ };
  
  return { 
    selectedCells, 
    foundWords, 
    handleCellMouseDown, 
    handleCellMouseEnter,
    handleCellMouseUp,
    isCellSelected,
    isCellFound,
    resetSelection
  };
};
```


**Переваги:**
- Компоненти стають простішими та читабельнішими
- Логіку легко тестувати ізольовано
- Можна повторно використовувати в різних компонентах
- Чітке розділення відповідальності

---

### Практика № 4: Модульний Global State Management за допомогою Zustand

**Опис:** Zustand - легка бібліотека для управління глобальним станом. Замість використання одного великого store (God Object, який керує всім станом додатку), було реалізовано модульний підхід. Кожен store відповідає за конкретну domain-область, що забезпечує слабку зв'язність компонентів та дозволяє гнучко використовувати persist middleware лише для необхідних даних.

**Реалізація в проекті:**

Проект використовує три окремі store модулі:

[useSettingsStore.js](src/store/useSettingsStore.js) - налаштування гри з персистентністю:
```javascript
export const useSettingsStore = create(
  persist(
    (set) => ({
      settings: getDefaultSettings(),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      
      resetSettings: () =>
        set({ settings: getDefaultSettings() }),
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({ settings: state.settings })
    }
  )
);
```

[useProfileStore.js](src/store/useProfileStore.js) - профіль користувача та історія ігор з персистентністю:
```javascript
export const useProfileStore = create(
  persist(
    (set) => ({
      profile: getDefaultProfile(),
      
      addGameResult: (result) =>
        set((state) => ({
          profile: {
            ...state.profile,
            gamesPlayed: state.profile.gamesPlayed + 1,
            gamesWon: result.won ? state.profile.gamesWon + 1 : state.profile.gamesWon,
            totalScore: state.profile.totalScore + result.score,
            history: [result, ...state.profile.history].slice(0, 10)
          }
        })),
      
      resetProfile: () =>
        set({ profile: getDefaultProfile() }),
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({ profile: state.profile })
    }
  )
);
```

[useGameResultStore.js](src/store/useGameResultStore.js) - тимчасове зберігання результату останньої гри (з персистентністю для відновлення після перезавантаження):
```javascript
export const useGameResultStore = create(
  persist(
    (set) => ({
      lastResult: getInitialResult(),
      
      setLastResult: (result) => set({ lastResult: result }),
      clearLastResult: () => set({ lastResult: getInitialResult() }),
    }),
    {
      name: 'last-game-result',
      partialize: (state) => ({ lastResult: state.lastResult })
    }
  )
);
```

Використання в компонентах (підписка лише на необхідні дані):
```javascript
// Компонент підписується тільки на settings, не на весь store
const settings = useSettingsStore((state) => state.settings);
const updateSettings = useSettingsStore((state) => state.updateSettings);

// Інший компонент підписується на profile незалежно
const profile = useProfileStore((state) => state.profile);
const addGameResult = useProfileStore((state) => state.addGameResult);
```

**Переваги модульного підходу:**
- **Слабка зв'язність** - зміни в одному store не впливають на інші
- **Гнучка персистентність** - кожен store самостійно вирішує, чи потрібно зберігати дані
- **Оптимізовані ре-рендери** - компонент оновлюється тільки при зміні використаної частини стану
- **Легше тестувати** - кожен store можна тестувати ізольовано
- **Простіше масштабувати** - додавання нового функціоналу не вимагає модифікації існуючих store
- **Чіткі межі відповідальності** - кожен store має конкретну domain-область
---

### Практика № 5: Декларативна валідація форм

**Опис:** Валідація форм повинна бути декларативною та винесеною з компонентів. Замість довгих перевірок через if-else, які забруднюють код та ускладнюють підтримку, використовується підхід валідації за допомогою схем бібліотеки Yup. Правила валідації описані окремою схемою у вигляді конфігурації, що робить форми чистими, а логіку валідації - зручною для читання, тестування та модифікації.

**Реалізація в проекті:**

[validationSchema.js](src/utils/validationSchema.js) - декларативна схема валідації:
```javascript
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
```

Використання в [SettingsPage.jsx](src/pages/SettingsPage.jsx) з React Hook Form:
```javascript
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { settingsSchema } from '../utils/validationSchema';

const SettingsPage = () => {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: settings
  });

  const onSubmit = (data) => {
    updateSettings(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="timeLimit"
        control={control}
        render={({ field }) => (
          <>
            <input 
              type="number" 
              className={styles.appInput}
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            />
            {errors.timeLimit && (
              <span className={styles.errorMessage}>
                {errors.timeLimit.message}
              </span>
            )}
          </>
        )}
      />
      
      <Button type="submit">Зберегти налаштування</Button>
    </form>
  );
};
```

**Переваги декларативної валідації:**
- **Читабельність** - правила валідації описані як конфігурація, а не як процедурний код
- **Централізація** - вся логіка валідації в одному місці, легко знайти та модифікувати
- **Відсутність дублювання** - не потрібно писати однакові перевірки в різних місцях
- **Легке тестування** - схему можна тестувати незалежно від компонентів
- **Автоматичні повідомлення** - помилки генеруються автоматично на основі правил
- **Валідація перед відправкою** - React Hook Form інтегрується з Yup для валідації на стороні клієнта