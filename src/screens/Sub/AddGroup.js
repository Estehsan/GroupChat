import React , {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Animated,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import Icon from '@expo/vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign,Ionicons } from '@expo/vector-icons';

const AddGroup = (props) => {
        return (
            <LinearGradient
            colors={["#000", "#7F8C8D"]}
             style={styles.gradient}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                      onPress={() => props.navigation.goBack()}
                     >  
                      <View><Ionicons name="ios-arrow-back" size={30} color="white" /><Text style={styles.header}>Back</Text></View>
                     
                   
                     </TouchableOpacity>
                   
                </View>
               <Text>......</Text>
                <View style={styles.ops}>
                     <View style={styles.col}>
                         <Text style={styles.day}>Add Group</Text>
                     </View>
                    <View style={styles.Form}> 
                <Text>Hello</Text>
                    </View>
                </View>
            </LinearGradient>
         
        )
}

export default AddGroup;

const styles = StyleSheet.create({
    Form:{
        height:500,
        width:500,
        color:"#000",
    },
    list:{
        marginTop:300,
    },
    card:{
        marginLeft:400,
        width:400,
        flexDirection:'row'
    },
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#FFF',
        flex:1,
        fontSize:24
    },
    proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    ops:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:"100%",
        backgroundColor:'#FFF',
        marginHorizontal:-20
    },
    col:{
        flexDirection:'row',
        marginTop:25,
        marginHorizontal:20,
        alignItems:'center'
    },
    day:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#000119',
        flex:1,
        fontSize:20
    }
})