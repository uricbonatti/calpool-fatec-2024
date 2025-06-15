import {
  FormControl,
  ISelectProps,
  Select as NativeBaseSelect,
} from 'native-base';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

type Props = ISelectProps & {
  errorMessage?: string | null;
  label?: string;
};

export function SelectInput({ errorMessage = null, label, ...rest }: Props) {
  // Função para lidar com o toque no seletor
  const handleSelectPress = () => {
    if (Platform.OS === 'android') {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleSelectPress}>
      <FormControl mb={4}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <NativeBaseSelect
          bg="gray.700"
          h={14}
          px={4}
          borderWidth={1}
          borderColor="gray.500"
          fontSize="md"
          color="white"
          fontFamily="body"
          mb={4}
          placeholderTextColor="gray.300"
          // Remove a propriedade problemática
          {...rest}
        >
          {rest.children}
        </NativeBaseSelect>
        <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
          {errorMessage}
        </FormControl.ErrorMessage>
      </FormControl>
    </TouchableWithoutFeedback>
  );
}

SelectInput.Item = NativeBaseSelect.Item;
