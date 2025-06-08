export type RideStatus = 'pending' | 'completed' | 'canceled';

export type RideHistoryDTO = {
  id: string;
  licensePlate: string;
  rideType: 'ida' | 'volta';
  date: Date;
  status: RideStatus;
  origin: string;
  destination: string;
  departureTime: string;
};

export type RideState = {
  title: string;
  data: RideHistoryDTO[];
};
