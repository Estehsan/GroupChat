import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/AntDesign";
import LastWatch from "../components/LastWatch";
// import Received from '../components/Received';
// import Sent from '../components/Sent';
import Input from "../components/Input";
import firebase, { firestore } from "./../database/firebase";
import MessageItem from "../components/MessageItem";

function Discussion({ route, navigation }){
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const { item } = route.params;
  const userID = firebase.auth().currentUser.uid;

  useEffect(() => {
    console.log(item);
    getUserJoinedAlreadyOrNot();
    getMessages();
  }, []);

  function getUserJoinedAlreadyOrNot() {
    firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .where("userID", "==", userID)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function (doc) {
            if (doc.data() != null) {
              setIsJoined(true);
            } else {
              setIsJoined(false);
              showAlertToJoinGroup();
            }
          });
        } else {
          showAlertToJoinGroup();
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  function showAlertToJoinGroup() {
    Alert.alert(
      Strings.JoinChat,
      Strings.JoinChatConfirmMessage,
      [
        {
          text: "Yes",
          onPress: () => {
            joinGroup();
          },
        },
        {
          text: "No",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  }

  function joinGroup() {
    const groupMemberRef = firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .doc();
    groupMemberRef
      .set({
        userID: userID,
      })
      .then(function (docRef) {
        setIsJoined(true);
        Alert.alert(Strings.joinMessage);
        setMessage("");
      })
      .catch(function (error) {
        setIsJoined(false);
        Alert.alert(Strings.JoinGroupError);
      });
  }

  function getMessages() {
    const db = firestore;
    var messages = [];

    db.collection("message")
      .doc(item.groupID)
      .collection("messages")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("New Message: ", change.doc.data());
            messages.push(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified Message", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed Message:", change.doc.data());
          }
          setMessageList(messages);
        });
      });
  }

  function sendMessagesToChat() {
    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc();
    const userEmail = firebase.auth().currentUser.email;

    messageRef
      .set({
        messageID: messageRef.id,
        message: message,
        senderId: userID,
        senderEmail: userEmail,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", messageRef.id);
        setMessage("");
      })
      .catch(function (error) {
        Alert.alert(error.message);
        console.log("Error:", error);
      });
  }

  // const send = () => {
  //     Data.push({id:inputMessage,message:inputMessage});
  //     setMessage('');
  // };

  // var txt = []
  // for (var i = 5; i < Data.length; i++){
  //     txt.push(<Sent key={Data[i].id} message={Data[i].message}/>);
  // }
  // console.log(Data)

  return (
    <LinearGradient
      colors={["#7F8C8D", "#FFFFFF", "#000"]}
      style={styles.container}
    >
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" color="#000119" size={24} />
          </TouchableOpacity>
  <Text style={styles.username}>{item.groupName}</Text>
          {/* <Image source={{ uri: itemPic }} style={styles.avatar} /> */}
        </View>
        <FlatList
          style={styles.flatList}
          data={messageList}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {}}>
      
   <MessageItem item={item} />
              
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <Input
         term={message}
          onTermChange={message => setMessage(message)}
        onSendPress={sendMessagesToChat}
      />
    </LinearGradient>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
