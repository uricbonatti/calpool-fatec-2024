import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { SignIn } from '@screens/SignIn';

type AuthRoutesType = {
  signIn: undefined;
};

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesType>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
