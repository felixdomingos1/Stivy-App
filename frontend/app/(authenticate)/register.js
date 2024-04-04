import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  // Picker
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useState } from "react";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [genero, setGenero] = useState("");

  const handleRegister = () => {
    const user = {
      firstName: firstName,
      surname: surname,
      email: email,
      password: password,
      status: status,
      genero: genero
    };

    axios.post("http://localhost:3333/usuario/create", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Registration successful", "You have been registered successfully");
        setFirstName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setStatus("");
        setGenero("");
        const token = response.data.payload;
        AsyncStorage.setItem("authToken", token);
        router.replace("/(tabs)/home")
      })
      .catch((error) => {
        Alert.alert("Registration failed", "An error occurred while registering");
        console.log("Registration failed", error)
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <KeyboardAvoidingView>

      <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              marginTop: 20,
              color: "#041E42",
            }}
          >
            Explore a Stivy Modal
          </Text>
        </View>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 40, color: "#041E42" }}>
          Register to your Account
        </Text>

        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          placeholder="Enter your first name"
        />

        <TextInput
          value={surname}
          onChangeText={(text) => setSurname(text)}
          style={styles.input}
          placeholder="Enter your surname"
        />

        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Enter your email"
        />

        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
        />

        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o teu Status" value="" />
          <Picker.Item label="Fotografo" value="fotografo" />
          <Picker.Item label="Modelo" value="modelo" />
          <Picker.Item label="Modelo Freelancer" value="modeloFreeLancer" />
          <Picker.Item label="Fotografo Freelancer" value="fotografoFreeLancer" />
        </Picker>

        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Selecione o Genero" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
        </Picker>

        <Pressable onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </KeyboardAvoidingView>
          <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              I have already account Login
            </Text>
          </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 300,
    padding: 15,
  },
  button: {
    width: 200,
    backgroundColor: "#0072b1",
    borderRadius: 6,
    marginTop: 30,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
