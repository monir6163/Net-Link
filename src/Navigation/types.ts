import { NavigatorScreenParams } from "@react-navigation/native";

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

// The Drawer contains the TabNavigator as one of its screens
export type RootDrawerParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  Profile: undefined;
  Support: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
