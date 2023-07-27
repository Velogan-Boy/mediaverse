//default apis
import React from 'react';
import {View, TextInput, StyleSheet,Dimensions} from 'react-native';

//gettting dimensions of the device
const {width,height} = Dimensions.get('window');

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

//color palette
import colors from '../../Config/colors';

const PasswordInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="white" />
      </View>

      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="white"
        secureTextEntry={true}
        {...rest}
        type="password"
        
      />
      
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: height / 15,
    borderColor: colors.white,
    borderWidth:5,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius:30
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'stretch'
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});