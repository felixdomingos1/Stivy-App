import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,  
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const postaragencia = ( ) => { 
  const [slogam, setSlogam] = useState(""); 
  const [nome, setName] = useState("");
  const [aboutUs, setUboutUs] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '*/*'; // Aceita qualquer tipo de arquivo
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
      };
      fileInput.click();
    } catch (error) {
      console.log('Erro ao selecionar o arquivo:', error);
    }
  };

  const uploadFile = async () => {
    console.log({
      nome:nome,
      slogam:slogam,
      aboutUs:aboutUs,
      selectedFile:selectedFile
    });
    if (!nome || !slogam || !aboutUs || !selectedFile) {
      Alert.alert('Nenhum arquivo selecionado.');
      return;
    }
    const token = await AsyncStorage.getItem('authToken') 
    console.log(token);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('nome', nome);
    formData.append('slogam', slogam);
    formData.append('aboutUs', aboutUs);

    try {
      const response = await fetch('http://localhost:3333/agencia/create', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      console.log( await response.json());
 
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    }
  };

  return (
    <View style={styles.container}>
        <TextInput
        value={nome}
        onChangeText={(text) => setName(text)}
        placeholder="Nome da Agencia"
        style={styles.input}
        />
        <TextInput
        value={slogam}
        onChangeText={(text) => setSlogam(text)}
        placeholder="O Slogam da Agencia"
        style={styles.input}
        />
        <TextInput
        value={aboutUs}
        onChangeText={(text) => setUboutUs(text)}
        placeholder="Escreva algo sobre da Agencia"
        style={styles.input}
        />
      <TouchableOpacity onPress={pickFile} style={styles.button}>
        <MaterialIcons name="perm-media" size={24} color="black" />
        <Text>Upload Image</Text>
      </TouchableOpacity>
      {selectedFile ? (
        <Image source={{ uri: selectedFile }} style={styles.image} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Pressable onPress={uploadFile} style={[styles.button, { marginTop: 20 }]}>
        <Text style={{ color: "white" }}>Criar uma Agencia</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0A0E0",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default postaragencia;
