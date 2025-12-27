import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../Context/AuthContext";
import { AuthStackParamList } from "../Navigation/types";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    console.log({ email, password });
    // Implement demo login logic here with expo secure store
    const demoEmail = "user@gmail.com";
    const demoPassword = "12345";

    if (email === demoEmail && password === demoPassword) {
      await login("dummy-auth-token");
      alert("Login successful");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-base">
            Sign in to continue to Net-Link
          </Text>
        </View>

        {/* Login Form */}
        <View className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2 ml-1">Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2 ml-1">
              Password
            </Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-base"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            className="mb-6 self-end"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text className="text-blue-600 font-semibold text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 items-center shadow-lg"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-bold text-lg">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
