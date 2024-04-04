import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";

const AgenciaProfile = ({ item, userId }) => {
  const [connectionSent, setConnectionSent] = useState(false);
  const sendConnectionRequest = async (senderId, agenciaId) => {
    try {
      const response = await fetch("http://localhost:3333/notification/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descricao:"Pedido de adesao", senderId, agenciaId }),
      });

      if (response.ok) {
        setConnectionSent(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(item);
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 9,
        marginHorizontal: 16,
        borderColor: "#E0A0E0",
        borderWidth: 1,
        marginVertical: 10,
        justifyContent: "center",
        alignItems:'center',
        display:'flex',
        padding:10, 
        width: (Dimensions.get("window").width - 80) / 2,
      }}
    >
      <View style={{ 
        display:'flex',
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor:'#E0A0E0', 
        borderRadius:50, 
        width:80,
        height:80
        }}> 
        <Text 
          style={{
            fontSize:24,
            fontWeight:600
          }}
        >
          {item?.nome[0]}{item.nome[item.nome.length - 1]}
          </Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "600" }}>
          {item?.nome}
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 , fontSize:13}}>
          {item?.slogam}
        </Text>
      </View>

      <Pressable
        onPress={() => sendConnectionRequest(userId, item.id)}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          borderColor:
            connectionSent || item?.connectionRequests?.includes(userId)
              ? "gray"
              : "#0072b1",
          borderWidth: 1,
          borderRadius: 25,
          marginTop: 7,
          paddingHorizontal: 15,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color:
              connectionSent || item?.connectionRequests?.includes(userId)
                ? "gray"
                : "#0072b1",
          }}
        >
          {connectionSent || item?.connectionRequests?.includes(userId)
            ? "Pendente"
            : "Pedir"}
        </Text>
      </Pressable>
    </View>
  );
};

export default AgenciaProfile;

const styles = StyleSheet.create({});
