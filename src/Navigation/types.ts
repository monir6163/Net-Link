import { NavigatorScreenParams } from "@react-navigation/native";

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  PackageList: {
    operatorName: string;
    operatorImage: any;
    operatorId: string;
  };
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
  ForgotPassword: undefined;
};
