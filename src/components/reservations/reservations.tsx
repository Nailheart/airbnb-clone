'use client';

import axios from 'axios';
import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  ReservationAndListingResponseDto,
  UserResponseDto
} from '@/common/types/types';
import { Container } from "@/components/container/container";
import { ListingCard } from "@/components/listing-card/listing-card";
import { Heading } from '@/components/heading/heading';
import { GridList } from '@/components/grid-list/grid-list';

type Props = {
  reservations: ReservationAndListingResponseDto[];
  currentUser?: UserResponseDto | null;
}

const Reservations: FC<Props> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const handleCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation cancelled');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservations"
        description="Bookings on your properties"
      />
      {/* TOOD: add some filter for sort cards asc | desc */}
      <GridList className="mt-10">
        {reservations.map((reservation: ReservationAndListingResponseDto) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            disabled={deletingId === reservation.id}
            onClick={handleCancel}
          />
        ))}
      </GridList>
    </Container>
  );
};

export { Reservations };