// src/components/ScreenHeader.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Button, Center, Heading, Icon, IHeadingProps } from 'native-base';

type Props = IHeadingProps & {
  title: string;
  showBackButton?: boolean;
};

export function ScreenHeader({
  title,
  showBackButton = false,
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

      <Heading
        color="gray.100"
        fontSize="xl"
        fontFamily="heading"
        flex={showBackButton ? 1 : 0}
        textAlign="center"
        ml={showBackButton ? -6 : 0}
        {...rest}
      >
        {title}
      </Heading>
    </Center>
  );
}
