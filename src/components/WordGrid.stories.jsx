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
};

export const WithSelected = Template.bind({});
WithSelected.args = {
  grid: mockGrid,
  isCellSelected: (r, c) => r === 0 && c <= 2,
  isCellFound: () => false,
};

export const WithFound = Template.bind({});
WithFound.args = {
  grid: mockGrid,
  isCellSelected: () => false,
  isCellFound: (r, c) => r === 3,
};