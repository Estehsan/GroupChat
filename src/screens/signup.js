import React, { useState } from 'react';
import { StyleSheet, SafeAreaView,Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function Signup({navigation}) {
  
    const [displayName, setdisplay] = useState();
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [isLoading, setLoading] = useState(false);

  const registerUser = () => {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      setLoading(true);
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: displayName
        })
        console.log('User registered successfully!')
        setLoading(false);
        setdisplay('');
        setEmail('');
        setPass('');
        navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }
   
    return (
      <SafeAreaView style={styles.container}>
          
            <View style={styles.tcontainer}>
              <TouchableOpacity 
                      onPress={() => navigation.goBack()}
                     >  
                      <View><Ionicons name="ios-arrow-back" size={30} color="white" /></View>                  
                     </TouchableOpacity>
                     
<Text style={styles.tHeading}>Register Now</Text>
             
            </View>
            <View style={styles.bcontainer}>
              
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={displayName}
          onChangeText={(val) => setdisplay(val)}
        />      
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
   
         <TouchableOpacity onPress={() => registerUser()}>
          <View style={styles.btn}>
            <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>

        <Text 
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>         
        </View>
        </SafeAreaView>                 
    );
  }

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    margin:30,
    marginEnd:20,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: 'black',
    marginTop: 70,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  tcontainer: {
    backgroundColor: "#000",
    flex:1,
    flexDirection:'row',
    padding:50,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  bcontainer: {
      flex: 8,
      borderTopLeftRadius:90,
      padding:30,
      width:"100%",
      justifyContent: "center",
      flexDirection: "column",
    },
    tHeading:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      paddingLeft:"25%",

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
      
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
      width:"90%",
      height:"10%",
  borderWidth: 1,
  borderColor: 'grey',

},
btn: { borderRadius: 16,borderTopRightRadius:0, backgroundColor: "#0bcac7", height: 60 ,alignItems:"center",justifyContent:"center",marginTop:20},

});