import { VehicleDTO } from './vehicle.dto';

export type UserAddress = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  complement?: string;
};

export type UserDTO = {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  ra: string;
  phone: string;
  address: UserAddress;
  vehicles?: VehicleDTO[];
};
