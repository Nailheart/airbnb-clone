import { FC } from 'react';

import { UserResponseDto } from '@/common/types/types';
import { useFavorite } from '@/hooks/hooks';
import { cn } from '@/helpers/helpers';
import { Icon } from '@/components/icon/icon';

type Props = {
  listingId: string;
  className?: string;
  currentUser?: UserResponseDto | null;
}

const ButtonHeart: FC<Props> = ({ listingId, className, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      className={cn(
        'cursor-pointer hover:opacity-80 transition',
        className
      )}
      type="button"
      onClick={toggleFavorite}
    >
      <Icon
        name="heart"
        className={cn(
          'fill-neutral-500/70 stroke-white',
          hasFavorited && 'fill-rose-500'
        )}
      />
    </button>
  );
};

export { ButtonHeart };