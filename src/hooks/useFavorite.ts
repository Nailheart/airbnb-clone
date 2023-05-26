import axios from 'axios';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { UserResponseDto } from '@/common/types/types';
import { useLoginModal } from '@/hooks/hooks';

type Props = {
  listingId: string;
  currentUser?: UserResponseDto | null;
}

const useFavorite = ({ listingId, currentUser }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const toggleFavorite = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      const request = hasFavorited
        ? () => axios.delete(`/api/favorites/${listingId}`)
        : () => axios.post(`/api/favorites/${listingId}`);
        
      await request();
      router.refresh();
      toast.success('Success!');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  return { hasFavorited, toggleFavorite };
}

export { useFavorite };