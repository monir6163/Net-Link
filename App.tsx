// Update App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/Context/AuthContext";
import { AuthNavigator } from "./src/Navigation/AuthNavigator";
import { DrawerNavigator } from "./src/Navigation/DrawerNavigator";
import SplashScreen from "./src/Screens/SplashScreen";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);

  return (
    <NavigationContainer>
      {!isAppReady || isLoading ? (
        <SplashScreen onAnimationFinish={() => setIsAppReady(true)} />
      ) : isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
