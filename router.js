import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "./src/screens/auth/RegistrationScreen";
import { LoginScreen } from "./src/screens/auth/LoginScreen";
import Home from "./src/screens/mainScreen/Home";

const Auth = createStackNavigator();
const Main = createStackNavigator();

export default function useRoute(params) {
  if (params) {
    return (
      <Auth.Navigator>
        <Auth.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Auth.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </Auth.Navigator>
    );
  }
  return (
    <Main.Navigator>
      <Main.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </Main.Navigator>
  );
}
