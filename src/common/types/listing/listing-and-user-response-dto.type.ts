import { ListingResponseDto } from './listing-response-dto.type';
import { UserResponseDto } from '../user/user-response-dto.type';

type ListingAndUserResponseDto = ListingResponseDto & {
  user: UserResponseDto;
};

export { type ListingAndUserResponseDto };