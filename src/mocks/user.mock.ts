import { UserDTO } from '@dtos';

// src/mocks/user.mock.ts

export const mockUser: UserDTO = {
  id: 'user-123',
  name: 'João Silva',
  email: 'joao@fatec.sp.gov.br',
  ra: '123456',
  avatar: 'https://github.com/joao.png',
  phone: '(11) 99999-9999',
  address: {
    street: 'Av. Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    cep: '01310-100',
  },
};

export const mockAuthTokens = {
  token: 'mock-token-123',
  refresh_token: 'mock-refresh-token-456',
};

// Exportando tudo em um objeto único para manter compatibilidade
export const user = mockUser;
export const token = mockAuthTokens.token;
export const refresh_token = mockAuthTokens.refresh_token;
