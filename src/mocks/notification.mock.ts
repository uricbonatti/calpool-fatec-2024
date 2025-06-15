import { INotification } from '@screens/Notifications';

export const mockNotifications: INotification[] = [
  {
    id: 'notif-1',
    title: 'Nova solicitação',
    message: 'Maria quer entrar na sua carona',
    type: 'ride',
    read: false,
    createdAt: new Date(),
  },
  {
    id: 'notif-2',
    title: 'Carona confirmada',
    message: 'Sua carona para amanhã foi confirmada',
    type: 'ride',
    read: true,
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'notif-3',
    title: 'Carona cancelada',
    message: 'Sua carona de hoje foi cancelada',
    type: 'ride',
    read: false,
    createdAt: new Date(Date.now() - 43200000),
  },
];
