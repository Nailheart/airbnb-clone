import { ReservationResponseDto } from './reservation-response-dto.type';
import { ListingResponseDto } from '../listing/listing-response-dto.type';

type ReservationAndListingResponseDto = ReservationResponseDto & {
  listing: ListingResponseDto;
};

export { type ReservationAndListingResponseDto };