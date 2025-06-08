// src/hooks/useUserVehicles.ts
import { fetchUserVehiclesMock } from '@mocks';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export function useUserVehicles(userId: string) {
  const [hasVehicles, setHasVehicles] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkVehicles = async () => {
        const vehicles = await fetchUserVehiclesMock(userId);
        setHasVehicles(vehicles.length > 0);
      };
      checkVehicles();
    }, [userId])
  );

  return hasVehicles;
}
