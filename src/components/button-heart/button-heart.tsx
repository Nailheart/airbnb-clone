import { FC } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { UserResponseDto } from '@/common/types/types';
import { useFavorite } from '@/hooks/hooks';

type Props = {
  listingId: string;
  className?: string;
  currentUser?: UserResponseDto | null;
}

const ButtonHeart: FC<Props> = ({ listingId, className="", currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      className={`
        relative
        cursor-pointer
        hover:opacity-80
        transition
        ${className}
      `}
      type="button"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28}
      />
      <AiFillHeart
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        size={24}
      />
    </button>
   );
};

export { ButtonHeart };