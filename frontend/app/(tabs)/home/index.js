import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Pressable, Image, Animated, Easing, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios"; 
import { useRouter } from "expo-router";
import { AntDesign, Entypo, Feather, SimpleLineIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const MAX_LINES = 3;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const hasUserReacted = (postId, userId, reactions) => {
  return reactions.some(reaction => reaction.postId === postId && reaction.userId === userId);
};

const Post = ({ item, userId, reactions }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(hasUserReacted(item.id, userId, reactions));
  const [likeScale] = useState(new Animated.Value(1)); 
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postId, setPostId] = useState();
  const [userID, setUserID] = useState();
  const [id, setReactionId] = useState();
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(item.reactions.length); // Estado para controlar o número de likes

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    // Verifica se o usuário reagiu ao post
    const userReaction = item.reactions.find(reaction => reaction.userId === userId);
    if (userReaction) {
      setIsLiked(true);
      setReactionId(userReaction.id);
    }
  }, []);

  const handleLikePost = async () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(likesCount + 1); // Incrementa o contador de likes
      Animated.sequence([
        Animated.timing(likeScale, {
          toValue: 1.5,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(likeScale, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
      
      axios.post(`http://localhost:3333/reactions/create-reactions`, {
          postId: item.id, 
          usuarioId: userId
        })
      .then(response => {
        console.log('Post liked successfully:', response.data);
        const { id } = response.data.reaction
        setReactionId(id)
      })
      .catch(error => {
        console.error('Error liking post:', error);
      });
    } else {
      // Se o usuário já reagiu, remove a reação
      handleUnreact();
    }
  };

  const handleUnreact = async () => {
    try {
        await fetch(`http://localhost:3333/reactions/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId:item.id,
          usuarioId:userId
        }),
      });
      setIsLiked(false);
      setLikesCount(likesCount - 1); // Decrementa o contador de likes
      setReactionId(null);
    } catch (error) {
      console.error('Erro ao remover a reação:', error);
      Alert.alert('Erro', 'Erro ao remover a reação');
    }
  };

  const handleToggleComments = (item) => {
    setPostId(item)
    setShowComments(!showComments);
  };
  
  const handleAddComment = async () => { 
    if (commentText !== '') {
      const newComment = {
        usuarioID: userId,
        postId: postId.id,
        content: commentText,
      };
  
      try {
        const response = await fetch('http://localhost:3333/comentarios/create-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });
  
        if (response.ok) {
          console.log('Comentário enviado com sucesso');
          setComments([...comments, newComment]);
          setCommentText('');
        } else {
          console.error('Erro ao enviar o comentário:', response.status);
        }
      } catch (error) {
        console.error('Erro ao enviar o comentário:', error.message);
      }
    }
  };

  const option = {
    year : 'numeric',
    month : 'long',
    day : 'numeric'
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop:15 }}>
          <Text 
            style={{
                backgroundColor:'#E0A0E0',
                padding:5,
                borderRadius:50,
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
          >{item?.usuario?.firstName[0]}{item?.usuario?.surname[0]}</Text>
          <View style={{ flexDirection: "column", gap: 2 }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>{item?.usuario?.firstName} {item?.usuario?.surname}</Text>
            <Text style={{ color: "gray" }}>{new Date(item?.createAt).toLocaleString('pt-br',option)}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
          <Feather name="x" size={20} color="black" />
        </View>
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}>
        <Text style={{ fontSize: 20, color:'#E0A0E0', fontWeight:600 }} numberOfLines={MAX_LINES}>{item?.title}</Text>
        <Text style={{ fontSize: 15 }} numberOfLines={showFullText ? undefined : MAX_LINES}>{item?.content}</Text>
        {!showFullText && (
          <Pressable onPress={toggleShowFullText}>
            <Text>See more</Text>
          </Pressable>
        )}
      </View>

      {item.img !== 'string' && (
        <AnimatedImage
        style={{ width: "100%", height: 240, transform: [{ scale: likeScale }] }}
        source={{ uri: `http://localhost:3333/post/get-img/${item.id}` }}
        />
      )} 
      {item?.reactions?.length > 0 && (
        <View style={{ padding: 10, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <SimpleLineIcons name="heart" size={16} color={"red"}  />
          <Text style={{ color:"red"}}>{likesCount}</Text> {/* Alteração: exibe o número de likes */}
        </View>
      )}
      <View style={{ height: 2, borderColor: "#E0E0E0", borderWidth: 2 }} />
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginVertical: 10 }}>
        {!isLiked ? 
        <AnimatedPressable onPress={handleLikePost}>
          <AntDesign name="hearto" size={24} color={"gray"} />
          <Text style={{ fontSize: 12, color:"gray", marginTop: 2 }}>Like</Text>
        </AnimatedPressable> : 
        <AnimatedPressable onPress={handleUnreact}>
          <AntDesign name="hearto" size={24} color={"red"} />
          <Text style={{ fontSize: 12, color:"red", marginTop: 2 }}>DisLike</Text>
        </AnimatedPressable>
        }
        <Pressable onPress={()=>handleToggleComments(item)}>
          <FontAwesome name="comment-o" size={20} color="gray" />
          <Text style={{ fontSize: 12, color: "gray", marginTop: 2 }}>Comment</Text>
        </Pressable>
        <Pressable>
          <Ionicons name="md-share-outline" size={20} color="gray" />
          <Text style={{ fontSize: 12, color: "gray", marginTop: 2 }}>Repost</Text>
        </Pressable>
        <Pressable>
          <Feather name="send" size={20} color="gray" />
          <Text style={{ fontSize: 12, color: "gray", marginTop: 2 }}>Send</Text>
        </Pressable>
      </View>
      {showComments && (
        <View style={{ padding: 10 }}>
          {item.comment.map(comment => (
            
            <View key={comment.id} style={{ flexDirection: "column", alignItems: "start", marginBottom: 5, padding:7, backgroundColor:'#E0A0E0', borderRadius:5 }}>
              <Text style={{ fontWeight: "600" }}>{comment.usuario.firstName} {comment.usuario.surname}</Text>
              <Text style={{ marginLeft: 5 }}>{comment.content}</Text>
            </View>
          ))}

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <TextInput
              placeholder="Add a comment..."
              style={{ flex: 1, borderWidth: 1, borderColor: "#E0E0E0", padding: 8, borderRadius: 5 }}
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
            />
            <Pressable onPress={handleAddComment} style={{ marginLeft: 10, padding: 8, backgroundColor: "#0072b1", borderRadius: 5 }}>
              <Text style={{ color: "white" }}>Comentar</Text>
            </Pressable>
          </View>
          <Pressable onPress={handleToggleComments} style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "#0072b1" }}>Close Comments</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const Index = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [imgURL, setImgURL] = useState("");
  const [token, setToken] = useState("");
  const [reactions, setReactions] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Faça uma solicitação para pesquisar usuários e agências com base no query de pesquisa
      const response = await axios.get(`http://localhost:3333/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log('Error searching:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("Token not found");
          return;
        }
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/usuario/get/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setToken(token)
        if (!token) {
          console.log("Token not found");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://localhost:3333/post/get/null", config);
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <AnimatedScrollView>

      <View style={{ padding: 10 ,}}>
        <Text style={{
          backgroundColor:'#fff',
          flexDirection: "row", 
          alignItems: "center", 
          gap: 4, 
          marginTop:10, 
          padding:10, 
          borderRadius:10,
          display:'flex',
          justifyContent:'center',
          fontSize:20,
          fontWeight:600,
          backgroundColor:'#E0A0E0',
          color:'#fff'
        }}>STIVY MODEL</Text>
        <View style={{ backgroundColor:'#fff',flexDirection: "row", alignItems: "center", gap: 4, marginTop:10, padding:10, borderRadius:10 }}>
          <Pressable onPress={() => router.push("/home/profile")}>
            <Text>Ver Perfil</Text>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 7, gap: 10, backgroundColor: "white", borderRadius: 3, height: 30, flex: 1 }}>
            <TextInput placeholder="Search" style={{flex:1}} value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <Pressable onPress={handleSearch}>
              <AntDesign style={{ marginLeft: 10 }} name="search1" size={20} color="black" />
            </Pressable>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          </View>
            {searchResults.map((result, index) => (
              <View key={index} style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 10, elevation: 20 }}>
                <Text>{/* Renderizar as informações do resultado da pesquisa aqui */}</Text>
              </View>
            ))}
        </View>
        {
           posts.map( (item,index)=>{ 
          return (
            <View key={index} style={{
              backgroundColor:'#fff',
              borderRadius:10,
              marginTop:10,
              elevation:20
            }}>
              { <Post key={index} item={item}  userId={userId} reactions={reactions}/>}
            </View>
          );
            
        })
          }
      </View>
    </AnimatedScrollView>
  );
};

export default Index;
