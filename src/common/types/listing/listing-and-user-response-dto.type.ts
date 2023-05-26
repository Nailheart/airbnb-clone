import { Listing, User } from '@prisma/client';

type ListingAndUserResponseDto = Listing & {
  user: User;
};

export { type ListingAndUserResponseDto };