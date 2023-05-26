import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/services/services';
import prisma from '@/libs/prismadb';

type Props = {
  reservationId: string;
}

const DELETE = async (request: Request, { params }: { params: Props }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}

export { DELETE };