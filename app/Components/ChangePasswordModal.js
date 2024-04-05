import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const ChangePasswordModal = ({ blurb }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const {isChangePasswordModalVisible, setChangePasswordModalVisible, email} = useContext(Context);
  const navigation = useNavigation();

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

  const handlePasswordChange = async () => {
      await fetch(API_BASE+"/user/update-password", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({email: email, oldPassword: oldPassword, newPassword: newPassword})
      }).then(res => res.json())
    setChangePasswordModalVisible(!isChangePasswordModalVisible);
  };

  const validatePassword = (password) => {
    const isLengthValid = password.length <= 50;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid && isLengthValid);
    //setPasswordErrorMessage(isValid ? '' : 'Password must have at least 8 characters with at least one uppercase letter, one number, and one symbol.');
    setPasswordErrorMessage(isValid && isLengthValid ? '' : isLengthValid ? 'Password must have at least 8 characters with at least one uppercase letter, one number, and one symbol.' : 'Maximum character limit reached');
    return isValid;
  };  

  const validateConfirmPassword = (confirmPassword) => {
    const isMatch = newPassword === confirmPassword;
    setIsConfirmPasswordValid(isMatch);
    setConfirmPasswordErrorMessage(isMatch ? '' : 'Passwords do not match');
    return isMatch;
  };

  const isButtonActive = oldPassword !== '' && newPassword !== '' && confirmPassword !== '';

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangePasswordModalVisible}
        onRequestClose={() => {
          setChangePasswordModalVisible(!isChangePasswordModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>{blurb}</Text>
            <TextInput
              style={global.input}
              placeholder="old password"
              placeholderTextColor="black"
              onChangeText={(text) => {
                setOldPassword(text);
                setConfirmPassword(text);
              }}
            />
            <TextInput
              style={global.input}
              placeholder="new password"
              placeholderTextColor="black"
              //onChangeText={(text) => setNewPassword(text)}
              onChangeText={(text) => {
                validatePassword(text);
                setNewPassword(text)
              }}
            />

            {!isPasswordValid && (
                  <Text style={[global.centerBodyText, {flex: 0, margin: '0%',color: 'red'}]}>{passwordErrorMessage}</Text>
                )}

            <TextInput
              style={global.input}
              placeholder="confirm new password"
              placeholderTextColor="black"
              onChangeText={(text) => {
                validateConfirmPassword(text);
                setConfirmPassword(text);
              }}
            />
            {!isConfirmPasswordValid && (
              <Text style={[global.centerBodyText, {flex: 0, margin: '0%',color: 'red'}]}>{confirmPasswordErrorMessage}</Text>
            )}
            <Pressable
                style={({ pressed }) => [
                    isButtonActive ? global.button : global.buttonInactive, // Assuming these are the existing styles for the Pressable
                    {
                      opacity: pressed ? 0.2 : 1,
                    },
                ]}
                onPress={handlePasswordChange}
                >
                <Text style={global.buttonText}>Change Password </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                  global.buttonMinor, // Assuming this is the existing style for the Pressable
                  {
                    opacity: pressed ? 0.2 : 1,
                  },
              ]}
              onPress={() => {
                  setChangePasswordModalVisible(!isChangePasswordModalVisible);
                  navigation.navigate('Profile');
              }}
              >
              <Text style={global.buttonMinorText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '10%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  searchInput: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    //width: '100%',
    width: '25rem', // Adjust the width as needed
    height: '2.1rem',
    borderWidth: '0.1rem',
    borderColor: 'gray',
    borderRadius: 25,
    padding: '.25rem',
  },
});

export default ChangePasswordModal;
