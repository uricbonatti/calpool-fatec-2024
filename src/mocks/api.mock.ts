import { NextCarpoolDTO, RideCardDTO, RideHistoryDTO } from '@dtos';
import { CreateVehicleDTO } from '@dtos/create-vehicle.dto';
import { VehicleDTO } from '@dtos/vehicle.dto';
import { carpoolDetails, nextCarpools } from './carpool.mock';
import { mockAuthTokens, mockUser } from './user.mock';

type RideRequest = {
  id: string;
  passenger: {
    id: string;
    name: string;
    avatar?: string;
  };
  rideId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: Date;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'ride' | 'system' | 'request';
  read: boolean;
  createdAt: Date;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Simula login (posteriormente substituído por Firebase Auth)
export const signInMock = async () => {
  await delay(1500);
  return {
    user: mockUser,
    ...mockAuthTokens,
  };
};

// Simula busca de caronas (substituído por Firestore)
export const fetchNextCarpoolsMock = async (): Promise<NextCarpoolDTO[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(nextCarpools), 1000);
  });
};

// Simula detalhes de uma carona
export const fetchCarpoolDetailsMock = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...carpoolDetails,
          id,
        }),
      800
    );
  });
};

export const fetchRideHistoryMock = async (): Promise<RideHistoryDTO[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          licensePlate: 'ABC1D23',
          rideType: 'ida',
          date: new Date(Date.now() - 86400000), // 1 dia atrás
          status: 'completed',
          origin: 'Av. Paulista',
          destination: 'Fatec ZL',
          departureTime: '07:30',
        },
        {
          id: '2',
          licensePlate: 'XYZ9E87',
          rideType: 'volta',
          date: new Date(Date.now() - 172800000), // 2 dias atrás
          status: 'canceled',
          origin: 'Fatec ZL',
          destination: 'Metrô Belém',
          departureTime: '18:45',
        },
      ]);
    }, 1000);
  });
};

// Mock de veículos por usuário
export const fetchUserVehiclesMock = async (
  userId: string
): Promise<VehicleDTO[]> => {
  await delay(1000);
  return [
    {
      id: 'vehicle-1',
      model: 'Fiat Uno',
      plate: 'ABC1D23',
      year: 2018,
      color: 'Branco',
      userId,
      isPrimary: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

// Mock para adicionar veículo
export const addVehicleMock = async (
  data: CreateVehicleDTO
): Promise<VehicleDTO> => {
  await delay(800);
  return {
    ...data,
    id: `vehicle-${Math.random().toString(36).substr(2, 9)}`,
    isPrimary: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// Adicione estas funções ao seu arquivo de mocks
export const fetchRideRequestsMock = async (): Promise<RideRequest[]> => {
  await delay(1000);
  return [
    {
      id: 'req-1',
      passenger: {
        id: 'user-456',
        name: 'Maria Souza',
        avatar: 'https://github.com/maria.png',
      },
      rideId: 'ride-123',
      status: 'pending',
      requestedAt: new Date(),
    },
  ];
};

export const acceptRideRequestMock = async (requestId: string) => {
  await delay(800);
  return { success: true };
};

export const fetchNotificationsMock = async (): Promise<Notification[]> => {
  await delay(1000);
  return [
    {
      id: 'notif-1',
      title: 'Nova solicitação',
      message: 'Maria quer entrar na sua carona',
      type: 'ride',
      read: false,
      createdAt: new Date(),
    },
  ];
};

export const updateVehicleMock = async (vehicle: VehicleDTO) => {
  await delay(800);
  return vehicle;
};

export const fetchAvailableRidesMock = async (): Promise<RideCardDTO[]> => {
  await delay(800);

  return [
    {
      id: '1',
      type: 'ida',
      origin: 'Av. Paulista, 1000',
      destination: 'Fatec Zona Leste',
      departureTime: '07:30',
      availableSeats: 3,
      driverName: 'Maria S.',
      vehicleModel: 'Fiat Uno',
      date: new Date().toLocaleDateString('pt-BR'),
    },
    {
      id: '2',
      type: 'volta',
      origin: 'Fatec Zona Leste',
      destination: 'Metrô Belém',
      departureTime: '16:45',
      availableSeats: 2,
      driverName: 'João P.',
      vehicleModel: 'VW Gol',
      date: new Date().toLocaleDateString('pt-BR'),
    },
  ];
};
