import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/services/services';
import prisma from '@/libs/prismadb';

type Props = {
  listingId: string;
}

const POST = async (request: Request, { params }: { params: Props }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds }
  });

  return NextResponse.json(user);
}

const DELETE = async (request: Request, { params }: { params: Props }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds }
  });

  return NextResponse.json(user);
}

export { POST, DELETE };