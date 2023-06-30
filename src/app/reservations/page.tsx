import { getCurrentUser, getReservations } from '@/services/services';
import { EmptyState } from '@/components/empty-state/empty-state';
import { Reservations } from '@/components/reservations/reservations';

export const metadata = {
  title: 'Airbnb Clone | Reservations',
}

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (<EmptyState title="Unauthorized" subtitle="Please login" />);
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Reservations
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ReservationsPage;
