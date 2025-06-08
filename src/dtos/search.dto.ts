export type RideCardDTO = {
  id: string;
  type: 'ida' | 'volta';
  origin: string;
  destination: string;
  departureTime: string;
  availableSeats: number;
  driverName: string;
  vehicleModel: string;
  date: string;
};
