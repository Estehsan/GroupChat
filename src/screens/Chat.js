import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import { AntDesign } from "@expo/vector-icons";
import AddGroup from "./Sub/AddGroup";
import firebase, { firestore } from "../database/firebase";

const Chat = (props) => {
  
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getChats()
}, [])

function getChats() {
    const db = firestore
    var groupArray = []

    db.collection("groups")
        .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type == "added") {
                    console.log("New Group: ", change.doc.data())
                    groupArray.push(change.doc.data())
                }
                if (change.type === "modified") {
                    console.log("Modified Group: ", change.doc.data())
                }
                if (change.type === "removed") {
                    console.log("Removed Group", change.doc.data())
                }

                setGroups(groupArray)
            })
        })

}
return (
    <LinearGradient colors={["#000", "#7F8C8D"]} style={styles.gradient}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chat</Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        horizontal
        style={styles.proContainer}
        showsHorizontalScrollIndicator={false}
      ></ScrollView>
      <View style={styles.ops}>
        <View style={styles.col}>
          <Text style={styles.day}>Group Names</Text>
          <Entypo name="dots-three-horizontal" color="#000119" size={30} />
        </View>
        <FlatList
                data={groups}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                          props.navigation.navigate('Discussion', {
                                item
                            })
                        }}>
                            <Messages item={item}></Messages>
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>
      </View>
    </LinearGradient>
  );
};
export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row",
  },
  gradient: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 500,
    backgroundColor: "#FFF",
    marginHorizontal: -20,
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20,
  },
});
