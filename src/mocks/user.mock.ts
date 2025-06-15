import { UserDTO, VehicleDTO } from '@dtos';

export const mockUser: UserDTO = {
  id: '33c04352-2f29-4956-8987-686a6f5c3f4a',
  name: 'Uric',
  email: 'uric.cardoso@fatec.sp.gov.br',
  ra: '123456',
  avatar: 'https://github.com/uricbonatti.png',
  phone: '(19) 99911-3306',
  address: {
    street: 'Rua Emydio Pedrine Sobrinho',
    number: '52',
    neighborhood: 'Jardim Sonia',
    city: 'Mogi Guaçu',
    state: 'SP',
    cep: '13843-099',
  },
  pixKey: 'uricbonatti@gmail.com',
};

export const userVehicles: VehicleDTO[] = [
  {
    id: 'vehicle-1',
    model: 'Fiat Uno',
    plate: 'ABC1D23',
    year: 2018,
    color: 'Branco',
    userId: mockUser.id,
    isPrimary: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'vehicle-2',
    model: 'VW Gol',
    plate: 'XYZ9E87',
    year: 2020,
    color: 'Prata',
    userId: mockUser.id,
    isPrimary: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockAuthTokens = {
  token: 'mock-token-123',
  refresh_token: 'mock-refresh-token-456',
};
