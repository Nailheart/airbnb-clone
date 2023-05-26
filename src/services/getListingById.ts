import prisma from '@/libs/prismadb';
import { ListingByIdRequestDto } from '@/common/types/types';

const getListingById = async (params: ListingByIdRequestDto) => {
  try {
    const { listingId } = params;

    const listingAndUser = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true }
    });

    if (!listingAndUser) return null;

    return listingAndUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export { getListingById };
