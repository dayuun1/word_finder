import React from 'react';
import WordGrid from './WordGrid';

const mockGrid = [
  ['К', 'І', 'Т', 'А', 'Б'],
  ['Д', 'І', 'М', 'В', 'О'],
  ['Д', 'А', 'Н', 'Е', 'Б'],
  ['О', 'Н', 'У', 'К', 'А'],
  ['Л', 'И', 'С', 'Т', 'З'],
];

export default {
  title: 'Components/WordGrid',
  component: WordGrid,
  tags: ['autodocs'],
  argTypes: {
    cellColor: { control: 'color', description: 'Колір фону звичайної клітинки' },
    selectedColor: { control: 'color', description: 'Колір фону виділеної клітинки' },
    foundColor: { control: 'color', description: 'Колір фону знайденої клітинки' },
    onCellMouseDown: { action: 'mousedown' },
    onCellMouseEnter: { action: 'mouseenter' },
    onCellMouseUp: { action: 'mouseup' },
  },
};

const Template = (args) => <WordGrid {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  grid: mockGrid,
  isCellSelected: () => false,
  isCellFound: () => false,
  cellColor: '#ffffff',
  selectedColor: '#e0f2fe',
  foundColor: '#bbf7d0',
};

export const WithSelected = Template.bind({});
WithSelected.args = {
  ...Empty.args,
  isCellSelected: (r, c) => r === 0 && c <= 2,
  selectedColor: '#fef08a', 
};

export const WithFound = Template.bind({});
WithFound.args = {
  ...Empty.args,
  isCellFound: (r, c) => r === 3,
  foundColor: '#fca5a5', 
};

export const Interactive = Template.bind({});
Interactive.args = {
  ...Empty.args,
};