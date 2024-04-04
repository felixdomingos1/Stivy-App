import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import { useRouter } from "expo-router";
const connections = () => {
  const router = useRouter()
  const [connections, setConnections] = useState([]);

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchConnections();
    }
  }, [userId]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/usuario/get/${userId}`
      );
      setConnections(response.data.Notification);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 12,
          marginTop: 10
        }}
      >
      
      <Pressable
        onPress={() => router.push("/network")}
        >
        <AntDesign name="arrowleft" size={22} color="black" />
        </Pressable>

        <Text style={{ fontWeight: "500" }}>
          {connections?.length} Notificações
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AntDesign name="search1" size={22} color="black" />
          <Octicons name="three-bars" size={22} color="black" />
        </View>
      </View>

      <View
        style={{
          height: 2,
          borderColor: "#E0E0E0",
          borderWidth: 2,
          marginTop: 12,
        }}
      />

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        {connections?.map((item, index) => (
          <View style={{flexDirection:"row",alignItems:"center",gap:10,marginVertical:10}} key={index}>
            <Image
              style={{ width: 48, height: 48, borderRadius: 24 }}
              source={{ uri: item?.profileImage }}
            />
            <View style={{ flexDirection: "column", gap: 2,flex:1 }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.descricao}
              </Text>

              <Text style={{ color: "gray" }}>
                B.Tech | Computer Science Technology
              </Text>

              <Text style={{ color: "gray" }}>
                connected on {moment(item?.createdAt).format("MMMM Do YYYY")}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Entypo name="dots-three-vertical" size={20} color="black" />
              <Feather name="send" size={20} color="black" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default connections;

const styles = StyleSheet.create({});
