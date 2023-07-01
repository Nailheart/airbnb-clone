import { getCurrentUser, getListings } from '@/services/services';
import { ListingRequestDto, ListingResponseDto } from '@/common/types/types';
import { Container } from '@/components/container/container';
import { EmptyState } from '@/components/empty-state/empty-state';
import { ListingCard } from '@/components/listing-card/listing-card';
import { GridList } from '@/components/grid-list/grid-list';

type Props = {
  searchParams: ListingRequestDto;
};

const Home = async ({ searchParams }: Props) => {
  if (!searchParams) {
    return null;
  }

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (<EmptyState showReset />);
  }

  return (
    <Container>
      <GridList>
        {listings.map((listing: ListingResponseDto) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </GridList>
    </Container>
  );
};

export default Home;