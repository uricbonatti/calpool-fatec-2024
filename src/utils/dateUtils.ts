import { RideHistoryDTO, RideState } from '@dtos';
import { format } from 'date-fns';

export function getDayAndHourFromDate(date: Date) {
  const day = format(date, 'dd/MM');
  const hour = format(date, 'HH:mm');
  return { day, hour };
}
// Retorna a string mm min. se faltar menos de 120 minutos, senão retorna hh horas. E se faltar mais de 24 horas, retorna em dias. E se o horario já passou, retorna null.
export function calcRemainingTime(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  if (diff < 0) {
    return null;
  }
  const minutes = Math.floor(diff / 60000);
  if (minutes < 120) {
    return `${minutes} min.`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} horas.`;
  }
  const days = Math.floor(hours / 24);
  return `${days} dias.`;
}

// Adicione esta função se não existir
export function groupRidesByDate(rides: RideHistoryDTO[]): RideState[] {
  const grouped = rides.reduce(
    (acc, ride) => {
      const dateKey = ride.date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(ride);
      return acc;
    },
    {} as Record<string, RideHistoryDTO[]>
  );

  return Object.keys(grouped).map((date) => ({
    title: date,
    data: grouped[date],
  }));
}
