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

export const mockRideRequests: RideRequest[] = [
  {
    id: 'req-1',
    passenger: {
      id: 'user-456',
      name: 'Maria Souza',
      avatar: 'https://github.com/maria.png',
    },
    rideId: 'carpool-pending-1',
    status: 'pending',
    requestedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'req-2',
    passenger: {
      id: 'user-789',
      name: 'João Pereira',
      avatar: 'https://github.com/joao.png',
    },
    rideId: 'carpool-completed-1',
    status: 'accepted',
    requestedAt: new Date(Date.now() - 86400000),
  },
];
