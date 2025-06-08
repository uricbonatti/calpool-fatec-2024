import { NextCarpoolDTO } from '@dtos';
import { calcRemainingTime } from '@utils/dateUtils';
import { Box, HStack, Heading, Text, VStack } from 'native-base';
import { Car } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  data: NextCarpoolDTO;
};

export function ImminentRide({ data, ...rest }: Props) {
  const [arraivalOn, setArraivalOn] = useState<string | null>('');

  function formatArraivalOn(arraivalOn: Date) {
    const remainingTime = calcRemainingTime(arraivalOn);
    return remainingTime;
  }

  function rideString() {
    const arraiveString = (
      <Text
        color="green.500"
        fontSize="md"
        fontFamily="heading"
        fontWeight="bold"
      >
        {arraivalOn}
      </Text>
    );

    return arraivalOn
      ? `Sua proxima Carona em ${arraiveString}`
      : 'Sua carona deve estar a caminho.';
  }

  useEffect(() => {
    if (data && data.arraivalOn) {
      setArraivalOn(formatArraivalOn(data.arraivalOn));
    }
  }, [data]);

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        rounded="md"
        mb={5}
        mt={5}
      >
        <Box
          m={3}
          bg="gray.400"
          height={16}
          width={16}
          alignItems="center"
          justifyContent="center"
          rounded="sm"
          mr={4}
        >
          <Car size={48} color="#00B37E" />
        </Box>
        <VStack flex={1}>
          <Heading fontSize="sm" color="white" fontFamily="heading">
            {rideString()}
          </Heading>
          <Heading fontSize="sm" color="white" fontFamily="heading">
            {`Veiculo ${data.licensePlate}`}
          </Heading>
          <Text
            color="green.500"
            fontSize="sm"
            fontFamily="heading"
            fontWeight="bold"
          >
            Mais detalhes
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
