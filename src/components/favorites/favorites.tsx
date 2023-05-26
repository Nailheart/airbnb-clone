import { FC } from 'react';
import { ListingResponseDto, UserResponseDto } from '@/common/types/types';
import { Container } from "../container/container";
import { ListingCard } from "../listing-card/listing-card";
import { Heading } from '../heading/heading';
import { GridList } from '../grid-list/grid-list';

type Props = {
  listings: ListingResponseDto[];
  currentUser?: UserResponseDto | null;
}

const Favorites: FC<Props> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        description="List of places you favorited!"
      />
      <GridList className="mt-10">
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

export { Favorites };