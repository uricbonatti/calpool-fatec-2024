// src/routes/app.routes.tsx
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';

import { default as HistorySvg } from '@assets/history.svg';
import HomeSvg from '@assets/home.svg';
import ProfileSvg from '@assets/profile.svg';
import SearchSvg from '@assets/search.svg';

import { Details } from '@screens/Details';
import { EditVehicle } from '@screens/EditVehicle';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Offer } from '@screens/Offer';
import { Profile } from '@screens/Profile';
import { RideRequests } from '@screens/RideRequests';
import { Search } from '@screens/Search';

type AppRoutesType = {
  home: undefined;
  details: {
    carpoolId: string;
    fromScreen?: 'search' | 'upcoming' | 'history';
  };
  offer: undefined;
  search: undefined;
  history: undefined;
  profile: undefined;
  editVehicle: { vehicleId: string };
  rideRequests: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>;
const Stack = createNativeStackNavigator<AppRoutesType>();
const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  function HomeStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="offer" component={Offer} />
        <Stack.Screen name="rideRequests" component={RideRequests} />
      </Stack.Navigator>
    );
  }

  function SearchStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="details" component={Details} />
      </Stack.Navigator>
    );
  }

  function HistoryStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="history" component={History} />
        <Stack.Screen name="details" component={Details} />
      </Stack.Navigator>
    );
  }

  function ProfileStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="editVehicle" component={EditVehicle} />
      </Stack.Navigator>
    );
  }

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[16],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={HistoryStack}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
}
