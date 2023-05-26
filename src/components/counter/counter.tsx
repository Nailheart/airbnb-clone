import { FC } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

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
            w-10
            h-10
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
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <button
          className="
            flex
            items-center
            justify-center
            w-10
            h-10
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
          <AiOutlinePlus />
        </button>
      </div>
    </div>
   );
};
 
export { Counter };