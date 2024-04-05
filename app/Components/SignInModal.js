import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

EStyleSheet.build();

const SignInModal = ({blurb}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>{blurb}</Text>
            <Pressable
              //style={global.button}
              style={({ pressed }) => [
                global.button, 
                {
                  opacity: pressed ? 0.2 : 1,
                },
             ]}
              onPress={() => {setModalVisible(!modalVisible); navigation.navigate('Login');}}>
              <Text style={global.buttonText}>Sign In / Register</Text>
            </Pressable>
            
            <Pressable
              //style={global.buttonMinor}
              style={({ pressed }) => [
                global.buttonMinor, 
                {
                  opacity: pressed ? 0.2 : 1,
                },
             ]}
              onPress={() => {setModalVisible(!modalVisible); navigation.navigate('Home');}}>
              <Text style={global.buttonMinorText}>Return Home</Text>
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
  }
});

export default SignInModal