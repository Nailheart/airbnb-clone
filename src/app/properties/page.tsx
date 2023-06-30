import { getCurrentUser, getListings } from '@/services/services';
import { EmptyState } from '@/components/empty-state/empty-state';
import { Properties } from '@/components/properties/properties';

export const metadata = {
  title: 'Airbnb Clone | Properties',
}

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState 
        title="No properties found"
        subtitle="Looks like you have no properties." 
      />
    );
  }

  return (
    <Properties
      listings={listings}
      currentUser={currentUser}
    />
  );
}
 
export default PropertiesPage;
