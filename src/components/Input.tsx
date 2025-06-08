import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
  Text,
} from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  label?: string;
  helperText?: string;
};

export function Input({
  errorMessage = null,
  label,
  helperText,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
      />

      {helperText && !invalid && (
        <Text fontSize="xs" color="gray.300" mt={1}>
          {helperText}
        </Text>
      )}

      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
