import { UserDTO } from './user.dto';

// userDTO.ts
export type BasicUserInfo = Pick<UserDTO, 'id' | 'name' | 'avatar'>;

// carpoolDTO.ts
export type CarpoolStatus =
  | 'pending'
  | 'completed'
  | 'canceled'
  | 'in_progress';

export type CarpoolDetailsDTO = {
  id: string;
  driver: BasicUserInfo;
  participants: BasicUserInfo[];
  rideType: 'ida' | 'volta';
  status: CarpoolStatus;
  licensePlate: string;
  availableSeats: number;
  departureTime: string;
  arrivalTime?: string;
  origin: string;
  destination: string;
  routeCoordinates: Array<{ latitude: number; longitude: number }>;
  isDriver: boolean;
  isParticipant: boolean;
};

export type NextCarpoolDTO = {
  id: string;
  licensePlate: string;
  arraivalOn: Date;
};
