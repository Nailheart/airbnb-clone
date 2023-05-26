import prisma from '@/libs/prismadb';
import { ReservationRequestDto } from '@/common/types/types';

const getReservations = async (params: ReservationRequestDto) => {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };
    
    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservationsAndListings = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    });

    return reservationsAndListings;
  } catch (error) {
    throw new Error(error as string);
  }
};

export { getReservations };
