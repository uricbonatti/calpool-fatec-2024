import { IButtonProps, Button as NativeBaseButton } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline' | 'link' | 'ghost'; // Adicione 'link' aqui
};

export function Button({ title, variant = 'solid', ...rest }: Props) {
  function isOuline(variant: string): boolean {
    return variant === 'outline';
  }
  function isLink(variant: string): boolean {
    return variant === 'link';
  }
  function defineBGColor(variant: string): string {
    if (isOuline(variant) || isLink(variant)) {
      return 'transparent';
    } else {
      return 'green.700';
    }
  }

  function definePressColor(variant: string): string {
    if (isLink(variant)) {
      return 'gray.700';
    } else {
      return 'green.500';
    }
  }
  function defineTextColor(variant: string): string {
    if (isOuline(variant) || isLink(variant)) {
      return 'green.500';
    } else {
      return 'white';
    }
  }

  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={defineBGColor(variant)}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: definePressColor(variant),
      }}
      _text={{
        color: defineTextColor(variant),
        fontSize: 'sm',
        fontFamily: 'heading',
      }}
      {...rest}
    >
      {title}
    </NativeBaseButton>
  );
}
