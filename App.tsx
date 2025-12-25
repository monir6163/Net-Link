import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import "react-native-gesture-handler"; // MUST BE FIRST
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Required for Web/Drawer
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigator } from "./src/Navigation/AuthNavigator"; // Use your Auth Stack
import { DrawerNavigator } from "./src/Navigation/DrawerNavigator";
import SplashScreen from "./src/Screens/SplashScreen";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, check AsyncStorage for a token here
      setIsAuthenticated(false);
      setIsAppReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (!isAppReady) {
    return <SplashScreen onAnimationFinish={() => setIsAppReady(true)} />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
