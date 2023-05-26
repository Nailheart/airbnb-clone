import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/libs/prismadb';

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    return currentUser;
  } catch (error) {
    return null;
  }
};

export { getCurrentUser };
