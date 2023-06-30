import prisma from '@/libs/prismadb';
import { ListingByIdRequestDto } from '@/common/types/types';

const getListingById = async ({ listingId }: ListingByIdRequestDto) => {
  try {
    const listingAndUser = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true }
    });

    if (!listingAndUser) return null;

    return listingAndUser;
  } catch (error) {
    throw new Error('Failed to fetch listing and user.');
  }
};

export { getListingById };
