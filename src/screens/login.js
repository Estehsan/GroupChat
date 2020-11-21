// components/login.js
import { AntDesign, Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          setLoading(false);
          setEmail("");
          setPass("");
          navigation.navigate("Chat");
        })
        .catch((error) => Alert.alert(error.message));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tcontainer}>
        <Image
          style={{ height: 60, width: 400 }}
          source={require("./../images/logo.png")}
        ></Image>
      </View>
      <View style={styles.bcontainer}>
        <View style={styles.header}>
          <Text style={styles.tHeading}>Login</Text>
        </View>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPass(val)}
          maxLength={15}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => userLogin()}>
          <View style={styles.btn}>
            <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have account? Click here to signup
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  loginText: {
    color: "black",
    marginTop: 40,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  tcontainer: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bcontainer: {
    flex: 2,
    borderTopLeftRadius: 90,
    width: "100%",
    padding: 30,
  },

  tHeading: {
    color: "black",
    fontSize: 50,
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
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
  header: { alignItems: "center", padding: 30 },
  btn: { borderRadius: 16,borderTopRightRadius:0, backgroundColor: "#0bcac7", height: 60 ,alignItems:"center",justifyContent:"center",marginTop:20},
});
