import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import firebase, { firestore } from "./../database/firebase";
import { LinearGradient } from "expo-linear-gradient";


const MessageItem = ({ item, image, message }) => {
  const userID = firebase.auth().currentUser.uid;
  function messageView() {
    if (userID === item.senderId) { 
      return (
        <View style={styles.SentContainer}>
        <LinearGradient colors={["#7F8C8D", "#000"]} style={styles.gradient}>
          <Text style={styles.text}>{item.message}</Text>
        </LinearGradient>
        <Text style={styles.duration}>{item.senderEmail}</Text>
      </View>
     
      );
    } else {
      return (
        <View style={styles.receivedContainer}>
          <Image source={{ uri: image }} style={styles.img} />
          <View>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.duration}>{item.senderEmail}</Text>
          </View>
        </View>
      );
    }
  }
  return messageView();
};

export default MessageItem;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
  },
  receivedContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: 250,
  },
  SentContainer: {
    marginVertical: 25,
    alignSelf: "flex-end",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
});
