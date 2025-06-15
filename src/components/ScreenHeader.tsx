// src/components/ScreenHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  IHeadingProps,
} from 'native-base';

type Props = IHeadingProps & {
  title: string;
  showBackButton?: boolean;
  rightIcon?: React.ReactNode;
  rightIconColor?: string;
};

export function ScreenHeader({
  title,
  showBackButton = false,
  rightIcon,
  rightIconColor,
  ...rest
}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Center
      bg="gray.600"
      pb={6}
      pt={16}
      flexDirection="row"
      justifyContent={showBackButton ? 'space-between' : 'center'}
      px={showBackButton ? 4 : 0}
    >
      {showBackButton && (
        <Button variant="ghost" onPress={() => navigation.goBack()} p={0}>
          <Icon
            as={MaterialIcons}
            name="arrow-back"
            size={6}
            color="gray.200"
          />
        </Button>
      )}

      <HStack flex={1} justifyContent="center" alignItems="center">
        <Heading
          color="gray.100"
          fontSize="xl"
          fontFamily="heading"
          textAlign="center"
          {...rest}
        >
          {title}
        </Heading>
      </HStack>

      {rightIcon && (
        <Box ml="auto">
          <IconButton
            icon={rightIcon as any}
            color={rightIconColor}
            variant="ghost"
            disabled
          />
        </Box>
      )}
    </Center>
  );
}
