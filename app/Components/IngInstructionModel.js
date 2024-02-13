import React, {useState, useContext} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView


EStyleSheet.build();

const IngInstructionsModel = ({blurb}) => {
  const {isIngInstructionsModelVisible, setIngInstructionsModelVisible} = useContext(Context);
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isIngInstructionsModelVisible}
        onRequestClose={() => {
          setIngInstructionsModelVisible(!isIngInstructionsModelVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>Instruction Name</Text>

            <ScrollView>
            <View style={styles.instructionsContainer}>
              <Text style={global.bodyText}>Instructions go here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem donec massa sapien faucibus. In ante metus dictum at tempor commodo ullamcorper a. Urna neque viverra justo nec ultrices dui sapien. Nunc congue nisi vitae suscipit tellus mauris a. Elit sed vulputate mi sit. Rutrum quisque non tellus orci ac auctor augue mauris augue. Cras sed felis eget velit aliquet. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Bibendum neque egestas congue quisque egestas. Cursus euismod quis viverra nibh. Non enim praesent elementum facilisis leo vel.</Text>
            </View>
            </ScrollView>

            <Pressable
              style={global.buttonMinor}
              onPress={() => {setIngInstructionsModelVisible(!isIngInstructionsModelVisible); navigation.navigate('Test');}}>
              <Text style={global.buttonMinorText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </GestureHandlerRootView>
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
    padding: '5%', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '22.5rem',
    height: '35rem',
  },
  instructionsContainer: {
    //height: '2.1rem', // Set the desired height for the instructions container
    justifyContent: 'center', // Center the content vertically
  }
});

export default IngInstructionsModel