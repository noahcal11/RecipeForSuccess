import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const ChangePasswordModel = ({ blurb }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {isChangePasswordModelVisible, setChangePasswordModelVisible, email} = useContext(Context);
  const navigation = useNavigation();

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      const data = await fetch(API_BASE+"/user/update-password", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({email: email, oldPassword: oldPassword, newPassword: newPassword})
      })
    } else {
      console.log("Passwords do not match")
    }
    setChangePasswordModelVisible(!isChangePasswordModelVisible);
  };

  const isButtonActive = oldPassword !== '' && newPassword !== '' && confirmPassword !== '';

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangePasswordModelVisible}
        onRequestClose={() => {
          setChangePasswordModelVisible(!isChangePasswordModelVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>{blurb}</Text>
            <TextInput
              style={global.input}
              placeholder="old password"
              placeholderTextColor="black"
              onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
              style={global.input}
              placeholder="new password"
              placeholderTextColor="black"
              onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
              style={global.input}
              placeholder="confirm new password"
              placeholderTextColor="black"
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Pressable
              style={isButtonActive ? global.button : global.buttonInactive}
              onPress={handlePasswordChange}>
              <Text style={global.buttonText}>Change Password </Text>
            </Pressable>
            <Pressable
              style={global.buttonMinor}
              onPress={() => {
                setChangePasswordModelVisible(!isChangePasswordModelVisible);
                navigation.navigate('Profile');
              }}>
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

export default ChangePasswordModel;
