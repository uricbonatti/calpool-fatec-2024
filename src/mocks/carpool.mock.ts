import {
  CarpoolDetailsDTO,
  NextCarpoolDTO,
  RideCardDTO,
  RideHistoryDTO,
} from '@dtos';
import { RideType } from 'src/enums/ride-type';
import { RideStatus } from '../enums/ride-status';

export const pendingCarpoolDetailsMock: CarpoolDetailsDTO = {
  id: '7cfaa4bc-3382-48d0-9b3f-608e4b8cdaa6',
  driver: {
    id: 'c494f39b-5783-4b42-be76-fcfa3e78f661',
    name: 'Maria Silva',
    avatar: 'https://github.com/maria.png',
    pixKey: 'maria.silva@test.io',
  },
  user: {
    id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
    name: 'Uric',
    avatar: 'https://github.com/uricbonatti.png',
    isDriver: false,
    isParticipant: true,
  },
  vehicle: {
    id: 'ddbbb496-ddbc-4906-870a-063f11e7b027',
    licensePlate: 'XYZ9E87',
    availableSeats: 3,
  },
  participants: [
    { id: '4e94adbc-6f15-41a0-91b9-e8c68a1ffefd', name: 'João Silva' },
    {
      id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
      name: 'Uric',
      avatar: 'https://github.com/uricbonatti.png',
    },
  ],
  ride: {
    rideType: RideType.IDA,
    status: RideStatus.PENDING,
    departureTime: '08:00',
    arrivalTime: '08:45',
    origin: 'Av. Padre Jaime, 235',
    destination: 'Fatec Mogi Mirim',
    day: '2025-06-27',
    routeCoordinates: [
      { latitude: -22.3777, longitude: -46.9273 },
      { latitude: -22.37899, longitude: -46.94185 },
      { latitude: -22.41524, longitude: -46.95372 },
      { latitude: -22.42626, longitude: -46.95306 },
      { latitude: -22.423, longitude: -46.9496 },
    ],
  },
};

export const pending2CarpoolDetailsMock: CarpoolDetailsDTO = {
  id: '6bcdac84-b4d0-458f-bd18-e3615a5e286d',
  driver: {
    id: 'c494f39b-5783-4b42-be76-fcfa3e78f661',
    name: 'Maria Silva',
    avatar: 'https://github.com/maria.png',
    pixKey: 'maria.silva@test.io',
  },
  user: {
    id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
    name: 'Uric',
    avatar: 'https://github.com/uricbonatti.png',
    isDriver: false,
    isParticipant: true,
  },
  vehicle: {
    id: 'ddbbb496-ddbc-4906-870a-063f11e7b027',
    licensePlate: 'ABC1D23',
    availableSeats: 3,
  },
  participants: [
    { id: '4e94adbc-6f15-41a0-91b9-e8c68a1ffefd', name: 'João Silva' },
    {
      id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
      name: 'Uric',
      avatar: 'https://github.com/uricbonatti.png',
    },
  ],
  ride: {
    rideType: RideType.IDA,
    status: RideStatus.PENDING,
    departureTime: '12:40',
    arrivalTime: '13:15',
    origin: 'Av. Padre Jaime, 235',
    destination: 'Fatec Mogi Mirim',
    day: '2025-06-14',
    routeCoordinates: [
      { latitude: -22.3777, longitude: -46.9273 },
      { latitude: -22.37899, longitude: -46.94185 },
      { latitude: -22.41524, longitude: -46.95372 },
      { latitude: -22.42626, longitude: -46.95306 },
      { latitude: -22.423, longitude: -46.9496 },
    ],
  },
};

export const completedCarpoolDetailsMock: CarpoolDetailsDTO = {
  id: 'aa81f964-991d-40df-84a1-34575740acd0',
  driver: {
    id: 'c494f39b-5783-4b42-be76-fcfa3e78f661',
    name: 'Maria Silva',
    avatar: 'https://github.com/maria.png',
    pixKey: 'maria.silva@test.io',
  },
  user: {
    id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
    name: 'Uric',
    avatar: 'https://github.com/uricbonatti.png',
    isDriver: false,
    isParticipant: true,
  },
  vehicle: {
    id: 'ddbbb496-ddbc-4906-870a-063f11e7b027',
    licensePlate: 'ABC1D23',
    availableSeats: 3,
  },
  participants: [
    { id: '4e94adbc-6f15-41a0-91b9-e8c68a1ffefd', name: 'João Silva' },
    {
      id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
      name: 'Uric',
      avatar: 'https://github.com/uricbonatti.png',
    },
  ],
  ride: {
    rideType: RideType.IDA,
    status: RideStatus.COMPLETED,
    departureTime: '08:00',
    arrivalTime: '08:45',
    origin: 'Av. Padre Jaime, 235',
    destination: 'Fatec Mogi Mirim',
    day: '2025-06-15',
    routeCoordinates: [
      { latitude: -22.3777, longitude: -46.9273 },
      { latitude: -22.37899, longitude: -46.94185 },
      { latitude: -22.41524, longitude: -46.95372 },
      { latitude: -22.42626, longitude: -46.95306 },
      { latitude: -22.423, longitude: -46.9496 },
    ],
  },
};

export const canceledCarpoolDetailsMock: CarpoolDetailsDTO = {
  id: 'ff086cf2-2524-4e45-ab59-ce79af683290',
  driver: {
    id: 'c494f39b-5783-4b42-be76-fcfa3e78f661',
    name: 'Maria Silva',
    avatar: 'https://github.com/maria.png',
    pixKey: 'maria.silva@test.io',
  },
  user: {
    id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
    name: 'Uric',
    avatar: 'https://github.com/uricbonatti.png',
    isDriver: false,
    isParticipant: true,
  },
  vehicle: {
    id: 'ddbbb496-ddbc-4906-870a-063f11e7b027',
    licensePlate: 'ABC1D23',
    availableSeats: 3,
  },
  participants: [
    { id: '4e94adbc-6f15-41a0-91b9-e8c68a1ffefd', name: 'João Silva' },
    {
      id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
      name: 'Uric',
      avatar: 'https://github.com/uricbonatti.png',
    },
  ],
  ride: {
    rideType: RideType.IDA,
    status: RideStatus.CANCELED,
    departureTime: '08:00',
    arrivalTime: '08:45',
    origin: 'Av. Padre Jaime, 235',
    destination: 'Fatec Mogi Mirim',
    day: '2025-06-14',
    routeCoordinates: [
      { latitude: -22.3777, longitude: -46.9273 },
      { latitude: -22.37899, longitude: -46.94185 },
      { latitude: -22.41524, longitude: -46.95372 },
      { latitude: -22.42626, longitude: -46.95306 },
      { latitude: -22.423, longitude: -46.9496 },
    ],
  },
};
//add order by date to the mockCarpools array
export const mockCarpools: CarpoolDetailsDTO[] = [
  pending2CarpoolDetailsMock,
  pendingCarpoolDetailsMock,
  completedCarpoolDetailsMock,
  canceledCarpoolDetailsMock,
];

export const getCarpoolById = (id: string): CarpoolDetailsDTO =>
  mockCarpools.find((carpool) => carpool.id === id) ||
  canceledCarpoolDetailsMock;

export const rideHistory: RideHistoryDTO[] = mockCarpools
  .filter((carpool) => carpool.ride.status !== RideStatus.PENDING)
  .map(
    (carpool) =>
      ({
        id: carpool.id,
        licensePlate: carpool.vehicle.licensePlate,
        rideType: carpool.ride.rideType,
        date: new Date(
          carpool.ride.status === RideStatus.COMPLETED
            ? Date.now() - 86400000
            : carpool.ride.status === RideStatus.PENDING
              ? Date.now() + 86400000
              : Date.now() - 172800000
        ),
        status: carpool.ride.status,
        origin: carpool.ride.origin,
        destination: carpool.ride.destination,
        departureTime: carpool.ride.departureTime,
      }) as RideHistoryDTO
  );

function generateArraivalOnDate(time: string, date: string): Date {
  const [hours, minutes] = time.split(':').map(Number);

  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export const mockNextCarpools: NextCarpoolDTO[] = mockCarpools
  .filter((carpool) => carpool.ride.status === RideStatus.PENDING)
  .map((carpool) => ({
    id: carpool.id,
    licensePlate: carpool.vehicle.licensePlate,
    arraivalOn: generateArraivalOnDate(
      carpool.ride.departureTime,
      carpool.ride.day
    ),
  }));

export const avaliableRidesMock = mockCarpools
  .filter((carpool) => carpool.ride.status === RideStatus.PENDING)
  .map((carpool) => {
    const date = generateArraivalOnDate(
      carpool.ride.departureTime,
      carpool.ride.day
    );
    console.log('avaliableRidesMock', date);
    return {
      id: carpool.id,
      type: carpool.ride.rideType,
      origin: carpool.ride.origin,
      destination: carpool.ride.destination,
      departureTime: carpool.ride.departureTime,
      availableSeats: carpool.vehicle.availableSeats,
      driverName: carpool.driver.name,
      vehicleModel: carpool.vehicle.model || '',
      date: date.toLocaleDateString('pt-BR'),
    } as RideCardDTO;
  });
