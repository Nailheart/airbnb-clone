import prisma from '@/libs/prismadb';
import { Prisma } from '@prisma/client';
import { ReservationRequestDto } from '@/common/types/types';

const getReservations = async ({
  listingId,
  userId,
  authorId,
}: ReservationRequestDto) => {
  try {
    const query: Prisma.ReservationWhereInput = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservationsAndListings = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    });

    return reservationsAndListings;
  } catch (error) {
    throw new Error('Failed to fetch reservations and listings.');
  }
};

export { getReservations };
