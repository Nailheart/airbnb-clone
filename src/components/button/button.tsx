import { FC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: IconType;
  onClick: () => void;
}

const Button: FC<Props> = ({
  label,
  small,
  outline,
  disabled,
  className="",
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      className={`
        w-full
        rounded-lg
        relative
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        hover:opacity-80
        ${small
          ? 'text-sm font-light py-1 border-[1px]'
          : 'text-md font-semibold py-3 border-2'
        }
        ${outline
          ? 'text-black bg-white border-black'
          : 'text-white bg-rose-500 border-rose-500'
        }
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon className="absolute left-4 top-3" size={24} /> }
      {label}
    </button>
  );
};

export { Button };
