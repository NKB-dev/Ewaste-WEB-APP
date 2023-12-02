import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        const role = response.data.role;
        if (role === "Garbage Collector") {
          navigation.replace("GarbageCollectorHomeScreen");
        } else if (role === "House Owner") {
          navigation.replace("HouseOwnerHomeScreen");
        }
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 0,
        backgroundSize: "cover",
      }}
    >
      <View>
        <Image
          style={{ marginTop: 70, width: 250, height: 150 }}
          source={require("../assets/LoginScreen/head.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Login In To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={30}
              color="green"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "green",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock"
              size={30}
              color="green"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "green",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ color: "gray" }}>Keep me logged in</Text>
          </View>
          <View>
            <Text style={{ color: "green", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 100 }} />
        <Pressable
          //onPress={handleLogin}
          onPress={() => navigation.navigate("common")}
          style={{
            width: 200,
            backgroundColor: "green",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{ marginTop: 15 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 16,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "green",
                fontSize: 16,
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});