import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';

import HistorySvg from '@assets/history.svg';
import HomeSvg from '@assets/home.svg';
import ProfileSvg from '@assets/profile.svg';
import SearchSvg from '@assets/search.svg';
import { Details } from '@screens/Details';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Offer } from '@screens/Offer';
import { Profile } from '@screens/Profile';
import { Search } from '@screens/Search';

type AppRoutesType = {
  offer: undefined;
  details: { carpoolId: string };
  home: undefined;
  search: undefined;
  history: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>;
const { Navigator: StackNavigator, Screen: StackScreen } =
  createStackNavigator<AppRoutesType>();
const { Navigator: TabNavigator, Screen: TabScreen } =
  createBottomTabNavigator<AppRoutesType>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[8];

  function HideStack() {
    return (
      <StackNavigator initialRouteName="home">
        <StackScreen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <StackScreen
          name="details"
          component={Details}
          options={{ headerShown: false }}
        />
        <StackScreen
          name="offer"
          component={Offer}
          options={{ headerShown: false }}
        />
      </StackNavigator>
    );
  }

  return (
    <TabNavigator
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
          paddingBottom: sizes[20],
          paddingTop: sizes[6],
          marginBottom: -sizes[6],
          paddingHorizontal: sizes[6],
        },
      }}
    >
      <TabScreen
        name="home"
        component={HideStack}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <TabScreen
        name="search"
        component={Search}
        options={{
          tabBarLabel: 'Search',

          tabBarIcon: ({ color }) => (
            <SearchSvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <TabScreen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
      <TabScreen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} height={iconSize} width={iconSize} />
          ),
        }}
      />
    </TabNavigator>
  );
}
