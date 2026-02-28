import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    styleType: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { children: 'Почати гру', styleType: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { children: 'Скасувати', styleType: 'secondary' };

export const Disabled = Template.bind({});
Disabled.args = { children: 'Недоступно', styleType: 'primary', disabled: true };