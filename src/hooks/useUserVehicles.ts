// src/hooks/useUserVehicles.ts
import { userVehicles } from '@mocks/user.mock';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export function useUserVehicles(userId: string) {
  const [hasVehicles, setHasVehicles] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkVehicles = async () => {
        const vehicles = userVehicles;
        setHasVehicles(vehicles.length > 0);
      };
      checkVehicles();
    }, [userId])
  );

  return hasVehicles;
}
