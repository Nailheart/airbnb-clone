import prisma from '@/libs/prismadb';
import { ListingRequestDto } from '@/common/types/types';

const getListings = async (params: ListingRequestDto) => {
  try {
    const {
      userId,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
    } = params;

    const query: any = {};

    if (userId) { query.userId = userId; }
    if (category) { query.category = category; }
    if (roomCount) {
      // gte = value is greater than or equal
      query.roomCount = {
        gte: +roomCount,
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    if (locationValue) { query.locationValue = locationValue; }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              // TODO: lte = value is less than or equal
              {
                startDate: { lte: startDate },
                endDate: { gte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' }
    });

    return listings;
  } catch (error) {
    throw new Error(error as string);
  }
};

export { getListings };
