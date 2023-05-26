import { FC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  icon: IconType,
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: FC<Props> = ({ label, icon: Icon, selected, onClick}) => {
  const handleClick = () => onClick(label);

  return (
    <div
      className={`
        flex
        flex-col
        gap-3
        p-4
        border-2
        rounded-xl
        cursor-pointer
        hover:border-black
        transition
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
      onClick={handleClick}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </div>
   );
};
 
export { CategoryInput };