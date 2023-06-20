import { FC } from 'react';

import { IconName } from '@/common/types/types';
import { cn } from '@/helpers/helpers';
import { Icon } from '@/components/icon/icon';

type Props = {
  label: string;
  iconName: IconName;
  selected?: boolean;
  className?: string;
  onClick: (value: string) => void;
}

const CategoryInput: FC<Props> = ({
  label,
  iconName,
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
      <Icon name={iconName} size={30} />
      <span className="font-semibold">{label}</span>
    </div>
   );
};
 
export { CategoryInput };