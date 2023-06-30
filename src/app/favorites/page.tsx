import { getCurrentUser, getFavoriteListings } from '@/services/services';
import { EmptyState } from '@/components/empty-state/empty-state';
import { Favorites } from '@/components/favorites/favorites';

export const metadata = {
  title: 'Airbnb Clone | Wishlist',
}

const ListingPage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Favorites
      listings={favoriteListings}
      currentUser={currentUser}
    />
  );
};
 
export default ListingPage;
