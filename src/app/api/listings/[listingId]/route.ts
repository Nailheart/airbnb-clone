import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/services/services';
import prisma from '@/libs/prismadb';

type Props = {
  listingId: string;
}

const DELETE = async (request: Request, { params }: { params: Props }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export { DELETE };