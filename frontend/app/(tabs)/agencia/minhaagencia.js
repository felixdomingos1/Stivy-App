import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Button,
    TextInput,
    Image,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useRouter } from "expo-router";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import jwt_decode from "jwt-decode";
  import {
    Ionicons,
    Entypo,
    Feather,
  } from "@expo/vector-icons";
  
  const profile = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState();
    const [userAgencia, setUserAgencia] = useState([])
    const router = useRouter();

      const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        setUserId(userId);
      };
      fetchUser(); 

    useEffect(() => {
      if (userId) {
          fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/usuario/get/${userId}`
        );
        const userData = response.data;
        const { Administrator } = response.data;
        setUserAgencia(Administrator)
        setUser(userData);
      } catch (error) {
        console.log("error fetching user profile", error);
      }
    };
    return (
        <View >
            {
                userAgencia.map((element)=>{
                    return(
            <View key={element.id}>
            <View style={{ position: "absolute", top: 130, left: 10 }}>
            <Image
                style={{ width: 120, height: 120, borderRadius: 60 }}
                source={{ uri: element?.agencia.image }}
            />
            </View> 
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>{element?.agencia.nome}</Text>
    
    
            <Text style={{ marginTop: 12, fontWeight: "500", fontSize: 15 }}>
                {element?.agencia.slogam} 
            </Text>
            <Text style={{ marginTop: 12, fontWeight: "500", fontSize: 15 }}>
                {element?.agencia.aboutUs}
            </Text>
            <Text style={{ fontSize: 15, color: "gray" }}>
                Angola, Luanda, Viana
            </Text>
            </View>
    
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 12,
                marginHorizontal: 10,
            }}
            >
            <Pressable
                style={{
                backgroundColor: "#0072b1",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 25,
                }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>Open to</Text>
            </Pressable>
            <Pressable
                style={{
                backgroundColor: "#0072b1",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 25,
                }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>
                Add Section
                </Text>
            </Pressable>
            </View>
    
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Analytics</Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 2 }}>
                Private to you
            </Text>
            <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
                <Ionicons name="people" size={28} color="black" />
                <View style={{ marginLeft: 7 }}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {} Usuarios
                </Text>
                <Text
                    style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "gray",
                    marginTop: 1,
                    }}
                >
                    Discover who's viewed your profile
                </Text>
                </View>
            </View>
            </View>
        </View>
                    )
                })
            }
        </View>
    );

  };
  
  export default profile;
  
  const styles = StyleSheet.create({});
  