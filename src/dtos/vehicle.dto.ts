export type VehicleDTO = {
  id: string;
  model: string;
  plate: string;
  year?: number;
  color?: string;
  isPrimary?: boolean;
  userId: string; // Relacionamento com usuário
  createdAt: Date;
  updatedAt: Date;
};
