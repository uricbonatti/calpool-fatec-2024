export type CreateVehicleDTO = {
  model: string;
  plate: string;
  year?: number;
  color?: string;
  userId: string; // Obrigatório na criação
};
