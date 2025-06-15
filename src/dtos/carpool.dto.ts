import { RideType } from 'src/enums/ride-type';
import { RideStatus } from './ride-history.dto';
import { UserDTO } from './user.dto';

// userDTO.ts
export type BasicUserInfo = Pick<UserDTO, 'id' | 'name' | 'avatar'>;
type Coordinates = {
  latitude: number;
  longitude: number;
};

type UserOnCarpool = {
  id: string;
  name: string;
  avatar: string;
  isDriver: boolean;
  isParticipant: boolean;
};
type Driver = {
  id: string;
  name: string;
  avatar: string;
  pixKey?: string;
};
type Vehicle = {
  id: string;
  licensePlate: string;
  availableSeats: number;
  model?: string;
};
type Ride = {
  rideType: RideType;
  status: RideStatus;
  departureTime: string;
  arrivalTime?: string;
  day: string;
  origin: string;
  destination: string;
  routeCoordinates: Coordinates[];
};

export type CarpoolDetailsDTO = {
  id: string;
  driver: Driver;
  user: UserOnCarpool;
  vehicle: Vehicle;
  participants: BasicUserInfo[];
  ride: Ride;
};

export type NextCarpoolDTO = {
  id: string;
  licensePlate: string;
  arraivalOn: Date;
};
