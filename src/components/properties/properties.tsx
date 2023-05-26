'use client';

import axios from 'axios';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { ListingResponseDto, UserResponseDto } from '@/common/types/types';
import { Container } from "../container/container";
import { ListingCard } from "../listing-card/listing-card";
import { Heading } from '../heading/heading';
import { GridList } from '../grid-list/grid-list';

type Props = {
  listings: ListingResponseDto[];
  currentUser?: UserResponseDto | null;
}

const Properties: FC<Props> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleDelete = (id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error);
    })
    .finally(() => {
      setDeletingId('');
    });
  };

  return ( 
    <Container>
      <Heading
        title="Properties"
        description="List of your properties"
      />
      <GridList className="mt-10">
        {listings.map((listing: ListingResponseDto) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
            onClick={handleDelete}
          />
        ))}
      </GridList>
    </Container>
  );
}

export { Properties };