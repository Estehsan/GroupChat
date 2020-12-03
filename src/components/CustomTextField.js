import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
const CustomTextField = ({placeholder,term,value,maxLength,onValidateTextField,error}) => {
        return (
        <View>
              <TextInput
          style={styles.inputStyle}
          onEndEditing={onValidateTextField}
          placeholder={placeholder}          
          value={value}
          onChangeText={onChangeText}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20,
  },
})
export default CustomTextField;
