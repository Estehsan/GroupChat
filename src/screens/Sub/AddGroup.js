import * as React from "react";
import { Text,View,Image, Platform, StyleSheet,TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { AntDesign,Ionicons } from '@expo/vector-icons';

import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddGroup(props) {
    return (
      <SafeAreaView style={styles.container}>
           <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
            <View style={styles.tcontainer}>
              <TouchableOpacity 
                      onPress={() => props.navigation.goBack()}
                     >  
                      <View><Ionicons name="ios-arrow-back" size={30} color="white" /></View>                  
                     </TouchableOpacity>
                     
<Text style={styles.tHeading}>Add Groups</Text>
               <TouchableOpacity 
                      onPress={() => props.navigation.goBack()}
                     >  
                     </TouchableOpacity>
            </View>
            <View style={styles.bcontainer}>
              <View style={styles.topbcontainer}>
                <View style={styles.menuContainer}>
                 <Image style={{height:180,width:200}} source={require('../../images/group_chat.png')}></Image>
                 <Text style={styles.activemenuText}>
                 Create Group
               </Text>
                <Image style={{height:90,width:89}} source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/001/191/814/small/circle-abstract.png'}}/>
                 <TextInput
                 placeholder="Enter Group Name"
                 placeholderTextColor="#666666" style={styles.inputs}  onChangeText={text => onChangeText(text)}
    />
       <TextInput
                 placeholder="Enter Hashtag"
                 placeholderTextColor="#666666" style={styles.inputs}  onChangeText={text => onChangeText(text)}
    />
       <TextInput style={{height:4}}
                 placeholder="Enter Group Description"
                 placeholderTextColor="#666666" style={styles.inputs}  onChangeText={text => onChangeText(text)}
    />
    
                 
                 
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
      flex:1,
      flexDirection:'row',
      padding:50,
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
    },
    bcontainer: {
        flex: 8,
        borderTopLeftRadius:90,
        width:"100%",
        justifyContent: "center",
        flexDirection: "column",
      },
      tHeading:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft:"30%",

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
  });
  