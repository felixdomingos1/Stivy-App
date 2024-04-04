import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons"; 
import ConnectionRequest from "../../../components/ConnectionRequest";
import { useRouter } from "expo-router";
import AgenciaProfile from "./todasagencias";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [agencia, setagencia] = useState([]);
  const [userAgencia, setUserAgencia] = useState([])
  const router = useRouter()
  const [connectionRequests, setConnectionRequests] = useState([]);
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
      fetchUserProfile();
    }
  }, [userId]);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/usuario/get/${userId}`
      );
      const userData =  response.data;
      const { agencia,Administrator } =  response.data;
      setUser(userData);
      setUserAgencia(Administrator)
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };
  console.log('esta e a agencia', userAgencia);
  useEffect(() => {
    if (userId) {
      fetchagencia();
    }
  }, [userId]);
  const fetchagencia = async () => {
    axios
      .get(`http://localhost:3333/agencia/get/null`)
      .then((response) => {
        setagencia(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userId) {
      fetchFriendRequests();
    }
  }, [userId]);
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/connection-request/${userId}`
      );
      if (response.status === 200) {
        const connectionRequestsData = response.data?.map((friendRequest) => ({
          id: friendRequest.id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.profileImage,
        }));

        setConnectionRequests(connectionRequestsData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(connectionRequests);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Pressable
        onPress={() => router.push("/agencia/agencia")}
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Criar Uma agencia
          </Text>
          <AntDesign name="arrowright" size={22} color="black" />
        </Pressable>
      </View>
      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}
          onPress={()=> router.push("/agencia/minhaagencia")}
        >Minhas Agencias ({userAgencia === null ? 0 : userAgencia.length })</Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequests={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Grow your network faster</Text>
          <Entypo name="cross" size={24} color="black" />
        </View>

        <Text>
          Entre as minhas agencias aqui. Plus see who's viewed your profile
        </Text>
        <View
          style={{
            backgroundColor: "#FFC72C",
            width: 140,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 8,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Try Premium
          </Text>
        </View>
      </View>
      <FlatList
        data={agencia}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item, key }) => (
          <AgenciaProfile userId={agencia} item={item} key={index} />
        )}
      />
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
