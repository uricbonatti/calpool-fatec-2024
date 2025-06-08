import { CarpoolDetailsDTO, NextCarpoolDTO } from '@dtos';

export const nextCarpools: NextCarpoolDTO[] = [
  {
    id: 'ride-1',
    licensePlate: 'ABC1D23',
    arraivalOn: new Date(Date.now() + 3600000), // 1 hora no futuro
  },
  {
    id: 'ride-2',
    licensePlate: 'XYZ9E87',
    arraivalOn: new Date(Date.now() + 86400000), // 1 dia no futuro
  },
];

export const carpoolDetails: CarpoolDetailsDTO = {
  id: 'ride-1',
  driver: {
    id: 'user-456',
    name: 'Maria Souza',
    avatar: 'https://github.com/maria.png',
  },
  participants: [{ id: 'user-123', name: 'João Silva' }],
  rideType: 'ida',
  status: 'pending',
  licensePlate: 'ABC1D23',
  availableSeats: 3,
  departureTime: '08:00',
  arrivalTime: '08:45',
  origin: 'Av. Paulista, 1000',
  destination: 'Fatec Zona Leste',
  routeCoordinates: [
    { latitude: -23.5632, longitude: -46.6544 },
    { latitude: -23.5432, longitude: -46.6344 },
  ],
  isDriver: false,
  isParticipant: true,
};
