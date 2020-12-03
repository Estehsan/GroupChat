import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInputComponent,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import firebase, { firestore } from "../../database/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import CustomTextField from "../../components/CustomTextField";

export default function AddGroup(props) {
  const [groupName, setGroupName] = useState();
  const [errorState, setErrorState] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function createGroupToFirebaseGroup() {
    setisLoading(true);
    const groupRef = firestore.collection("groups").doc();
    const userID = firebase.auth().currentUser.uid;

    groupRef
      .set({
        groupID: groupRef.id,
        groupName: groupName,
        userID: userID,
      })
      .then(function (docRef) {
        setisLoading(false);
        console.log("Document Written with ID", groupRef.id);
        addMemberOfChatInFirebase(groupRef.id, userID);
      })
      .catch(function (error) {
        Alert.alert(error.message);
        setisLoading(false);
        console.log("error adding Doc", error);
      });
  }
  function addMemberOfChatInFirebase(groupID, userID) {
    const memberRefs = firestore
      .collection("members")
      .doc(groupID)
      .collection("member")
      .doc();
    memberRefs
      .set({
        userID: userID,
      })
      .then(function (docRef) {
        props.navigation.goBack();
      })
      .catch(function (error) {
        setisLoading(false);
        console.error("Error adding Document", error);
      });
  }
  performCreateGroup = () => {
    createGroupToFirebaseGroup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.tcontainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View>
              <Ionicons name="ios-arrow-back" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.tHeading}>Add Groups</Text>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
          ></TouchableOpacity>
        </View>
        <View style={styles.bcontainer}>
          <View style={styles.topbcontainer}>
            <View style={styles.menuContainer}>
              <Image
                style={{ height: 180, width: 200 }}
                source={require("../../images/group_chat.png")}
              ></Image>
              <Text style={styles.activemenuText}>Create Group</Text>
              {/* <Image
                style={{ height: 90, width: 89 }}
                source={{
                  uri:
                    "https://static.vecteezy.com/system/resources/thumbnails/001/191/814/small/circle-abstract.png",
                }}
              /> */}
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter Group Name"
                value={groupName}
                // onValidateTextField = {validateField}

                onChangeText={(val) => setGroupName(val)}
              />

              <TouchableOpacity
                onPress={performCreateGroup}
                isLoading={isLoading}
              >
                <View style={styles.btn}>
                  <Text
                    style={{ color: "white", fontSize: 19, fontWeight: "bold" }}
                  >
                    Create Group
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tcontainer: {
    backgroundColor: "#000",
    flex: 1,
    flexDirection: "row",
    padding: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bcontainer: {
    flex: 8,
    borderTopLeftRadius: 90,
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  tHeading: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: "30%",
  },

  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20,
  },
  toptcontainer: {
    backgroundColor: "#3498db",
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    padding: 30,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 26,
  },
  activemenu: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    width: "45%",
    backgroundColor: "#17C37B",
    borderRadius: 10,
  },
  activemenuText: {
    fontSize: 20,
    color: "#000000",
    marginTop: 5,
  },
  aText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 5,
  },

  inputs: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    width: "90%",
    height: "10%",
    borderWidth: 1,
    borderColor: "grey",
  },
  btn: {
    width: 120,
    borderRadius: 16,
    borderTopRightRadius: 0,
    backgroundColor: "#0bcac7",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
