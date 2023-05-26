type ListingRequestDto = {
  userId?: string;
  category?: string;
  roomCount?: number;
  guestCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
};

export { type ListingRequestDto };