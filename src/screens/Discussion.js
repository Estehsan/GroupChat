import React,{Children, useState, useEffect, useRef} from 'react';
import {View,Text,Image,StyleSheet, Alert, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/AntDesign';
import LastWatch from '../components/LastWatch';
import Received from '../components/Received';
import Sent from '../components/Sent';
import Data from '../dummy/Data.json';
import Input from '../components/Input';
import firebase from '../database/firebase';




const Discussion = ({ route, navigation }) => {
    const { itemId, itemName , itemPic } = route.params;
    const [inputMessage, setMessage] = useState('');
    const[currentKey,setCurrentKey]=useState('0');
    const [data,setdata] = useState([{t:'', key:'', flag:''},]);
    useEffect(()=>{
        setdata([{t:'', key:'', flag:''},]);
        firebase.database().ref('Chats/').on('value',function(snapshot) {
            snapshot.forEach(function(value) {
            var x = value.child('Text').val();
            console.log("x: " + x);
            setCurrentKey((parseInt(currentKey)+parseInt(1)).toString());
            setdata((prevState)=>{return[{t:x,key:currentKey},...prevState] });
            }) 
            
        });
        
    },[])

    function LoadData(items)
    {    console.log("Items: "+items.t);
        {}
    if(items.t!=''){
    return(
        <Received message= {items.t} image={itemPic} />

        )}
    }
const removeNote=(key)=>
  {
    setdata((currentTodo)=>{return currentTodo.filter(data=> data.key!=key);});
  }
    const send = () => {
        setdata([{t:'', key:'', flag:''},]);
        const date = new Date().toLocaleString();
        firebase.database().ref('Chats/').push({
            sentBy: '4321',
            SentAt: date,
            SentTo: '1234',
            Text:inputMessage,
          }).then(() => {
            console.log('Message sent.');
            setMessage('');
          })
          .catch(error => console.log(error.message));
        
    };
    const scrollViewRef = useRef();
    return(
      <LinearGradient
      
      colors={["#7F8C8D", "#FFFFFF","#000"]}
        style={styles.container}
      >
          <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Icon name='left' color='#000119' size={24}/>
                    </TouchableOpacity>
                    <Text style={styles.username}>{itemName}</Text>
                    <Image source={{uri:itemPic}} style={styles.avatar}/>
                </View>
                <ScrollView ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                { data.reverse().map((items)=>{return(LoadData(items))})}
                </ScrollView>
          </View>
          <Input
            inputMessage={inputMessage}
            setMessage={(inputMessage)=> setMessage(inputMessage)}
            onSendPress={send}
          />
      </LinearGradient>
    )
}
export default Discussion;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:"100%"
    },
    main:{
        backgroundColor:'#FFF',
        height:'88%',
        paddingHorizontal:20,
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        paddingTop:40
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    username:{
        color:"#000119",
        fontFamily:'Montserrat_700Bold',
        fontSize:20,
        flex:1,
        textAlign:'center'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    }

})