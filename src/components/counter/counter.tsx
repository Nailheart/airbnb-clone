import { FC } from 'react';

import { Icon } from '@/components/icon/icon';

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: FC<Props> = ({ title, subtitle, value, onChange }) => {
  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => {
    if (value === 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <span className="font-light text-gray-600">{subtitle}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="counter-btn"
          type="button"
          onClick={handleDecrement}
        >
          <Icon name="minus" size={18} />
        </button>
        <div className="text-lg">{value}</div>
        <button
          className="counter-btn"
          type="button"
          onClick={handleIncrement}
        >
          <Icon name="plus" size={18} />
        </button>
      </div>
    </div>
   );
};
 
export { Counter };