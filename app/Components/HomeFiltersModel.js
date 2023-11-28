import React, {useContext, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const HomeFiltersModel = ({blurb}) => {
  const {isHomeFiltersModelVisible, setHomeFiltersModelVisible} = useContext(Context);
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isHomeFiltersModelVisible}
        onRequestClose={() => {
          setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>{blurb}</Text>
            
            <Pressable
              style={global.button}
              onPress={() => {
                setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
                setHomeFiltersModelVisible(false);
                navigation.navigate('Home');
            }}>
            <Text style={global.buttonMinorText}>Return Home</Text>
            </Pressable>
            
            <Pressable
              style={global.button}
              onPress={() => {
                setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
                setHomeFiltersModelVisible(false);
                navigation.navigate('Home');
            }}>
            <Text style={global.buttonMinorText}>Return Home</Text>
            </Pressable>

            <Pressable
              style={global.buttonMinor}
              onPress={() => {
                setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
                setHomeFiltersModelVisible(false);
                navigation.navigate('Home');
            }}>
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

export default HomeFiltersModel