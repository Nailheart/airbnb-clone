import { FC } from 'react';
import { IconType } from 'react-icons';

import { cn } from '@/helpers/helpers';

type Props = {
  label: string;
  icon: IconType;
  selected?: boolean;
  className?: string;
  onClick: (value: string) => void;
}

const CategoryInput: FC<Props> = ({
  label,
  icon: Icon,
  selected,
  className,
  onClick
}) => {
  const handleClick = () => onClick(label);

  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-black transition',
        selected && 'border-black',
        className,
      )}
      onClick={handleClick}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
   );
};
 
export { CategoryInput };