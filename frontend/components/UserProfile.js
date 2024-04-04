import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";


const ProfilePopup = ({ visible, onClose , item ,userId}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Image source={{ uri: item.img === null && '' }} style={styles.profileImage} /> */}
            <Text style={styles.profileText}> {item.firstName}</Text>
            <Text style={styles.profileText}>{item.email}</Text>
            <Text style={styles.profileText}>Estado: {item.status}</Text>
            <Text style={styles.profileText}>Gênero: {item.genero}</Text>
            {
              item.id !== userId && (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Seguir</Text>
                </Pressable>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Conectar</Text>
                </Pressable>
              </View>
              )
            }
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const UserProfile = ({ item, userId }) => {
  const router = useRouter()
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);


  const handleOpenProfile = () => {
    setIsProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
  };

  const sendConnectionRequest = async (senderId, agenciaId) => {
    try {
      const response = await fetch("http://localhost:3333/notification/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ descricao:"Pedido de integração", senderId, agenciaId }),
      });

      if (response.ok) {
        setConnectionSent(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
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
        >{item?.firstName[0]}{item?.surname[0]}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 14, fontWeight: "600" }}>
          {item?.firstName} {item?.surname}
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 , fontSize:13}}>
          {item?.genero} | {item?.status}
        </Text>
      </View>

          <Pressable
            onPress={handleOpenProfile}
            style={{
              marginLeft: "auto",
              marginRight: "auto", 
              borderWidth: 1,
              borderRadius: 25,
              marginTop: 7,
              paddingHorizontal: 15,
              paddingVertical: 4,
            }}
          > 
          <Text>Ver Perfil</Text>
          </Pressable>
            {

          userId !== item.id && (
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
                : "Convidar"}
            </Text>
            </Pressable>)
            }
          <ProfilePopup userId={userId} visible={isProfileVisible} onClose={handleCloseProfile} item={item}/>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width:300
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0072b1',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#f54242',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});
