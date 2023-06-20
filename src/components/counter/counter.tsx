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
          className="
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            border-[1px]
            text-neutral-600
            border-neutral-400
            cursor-pointer
            hover:opacity-80
            transition
          "
          type="button"
          onClick={handleDecrement}
        >
          <Icon name="minus" size={18} />
        </button>
        {/* TODO: replace to input */}
        <div className="text-lg">{value}</div>
        <button
          className="
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
            border-[1px]
            text-neutral-600
            border-neutral-400
            cursor-pointer
            hover:opacity-80
            transition
          "
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