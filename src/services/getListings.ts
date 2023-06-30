import prisma from '@/libs/prismadb';
import { ListingRequestDto } from '@/common/types/types';
import { Prisma } from '@prisma/client';

const getListings = async ({
  userId,
  category,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  startDate,
  endDate,
}: ListingRequestDto) => {
  try {
    const query: Prisma.ListingWhereInput = {};

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
              // lte = value is less than or equal
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
    throw new Error('Failed to fetch listings.');
  }
};

export { getListings };
