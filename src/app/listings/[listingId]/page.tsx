import { getCurrentUser, getListingById, getReservations } from '@/services/services';
import { EmptyState } from '@/components/empty-state/empty-state';
import { Listing } from '@/components/listing/listing';

type Props = {
  listingId: string;
}

const ListingPage = async ({ params }: { params: Props }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (<EmptyState />);
  }

  return (
    <Listing
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
