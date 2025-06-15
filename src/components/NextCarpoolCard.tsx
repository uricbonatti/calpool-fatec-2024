import { NextCarpoolDTO } from '@dtos';
import { Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  data: NextCarpoolDTO;
};

export function NextCarpoolCard({ data, ...rest }: Props) {
  const [arraivalOn, setArraivalOn] = useState<string>('');

  function formatArraivalOn(arraivalOn: Date) {
    const day = format(arraivalOn, 'dd/MM');
    const hour = format(arraivalOn, 'HH:mm');

    return `Saída em ${day} às ${hour}`;
  }

  useEffect(() => {
    if (data?.arraivalOn) {
      setArraivalOn(formatArraivalOn(data.arraivalOn));
    }
  }, [data?.arraivalOn]);

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
        paddingLeft={4}
      >
        <VStack flex={1}>
          <Heading fontSize="md" color="white" fontFamily="heading">
            {data.licensePlate}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {arraivalOn}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
