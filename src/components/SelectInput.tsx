import {
  FormControl,
  ISelectProps,
  Select as NativeBaseSelect,
} from 'native-base';

type Props = ISelectProps & {
  errorMessage?: string | null;
  label?: string;
};

export function SelectInput({ errorMessage = null, label, ...rest }: Props) {
  return (
    <FormControl mb={4}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <NativeBaseSelect
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"
        {...rest}
      >
        {rest.children}
      </NativeBaseSelect>
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

// Adiciona o subcomponente Item
SelectInput.Item = NativeBaseSelect.Item;
