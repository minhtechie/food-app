import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import StoreDetailScreen from "../screens/StoreDetailScreen";
import DishDetail from '../screens/DishDetail';

const Stack = createNativeStackNavigator();

const MainNav = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StoreDetail"
        screenOptions={{
          headerBackTitle: '',
        }}
      >
        <Stack.Screen
          name="StoreDetail"
          component={StoreDetailScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="DishDetail"
          component={DishDetail}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;

