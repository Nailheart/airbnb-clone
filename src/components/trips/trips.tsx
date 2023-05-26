'use client';

import axios from 'axios';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  ReservationAndListingResponseDto,
  UserResponseDto,
} from '@/common/types/types';
import { Container } from "../container/container";
import { ListingCard } from "../listing-card/listing-card";
import { Heading } from '../heading/heading';
import { GridList } from '../grid-list/grid-list';

type Props = {
  reservations: ReservationAndListingResponseDto[];
  currentUser?: UserResponseDto | null;
}

const Trips: FC<Props> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = (id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  };

  return (
    <Container>
      <Heading
        title="Trips"
        description="Where you've been and where you're going"
      />
      <GridList className="mt-10">
        {reservations.map((reservation: ReservationAndListingResponseDto) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onClick={handleCancel}
          />
        ))}
      </GridList>
    </Container>
  );
};

export { Trips };