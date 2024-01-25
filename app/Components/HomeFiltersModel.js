import React, {useContext, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import SwitchComp from '../Components/Switch';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const WIDGETS = [
  { title: 'Popular'},
  { title: 'Breakfast' },
  { title: 'Lunch' },
  { title: 'Dinner' },
  { title: 'Dessert' },
  { title: 'Chicken' },
  { title: 'Salads' },
  { title: 'American' },
  { title: 'Mexican' },
  { title: 'Italian' },
  { title: 'Chinese' },
  { title: 'Surprise Me!' },
  // Add more widgets as necessary
];

const HomeFiltersModel = ({widgets, setWidgets}) => {
  const {isHomeFiltersModelVisible, setHomeFiltersModelVisible} = useContext(Context);
  const navigation = useNavigation();
  let tempWidgets = widgets;
  
  function updateWidgets(index) {
    const nextWidgets = tempWidgets.map((c, i) => {
      if (i === index) {
        // Flip the true/false value
        return !c;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    tempWidgets = nextWidgets;
  }

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
            <Text style={global.titleText}>Select Widgets to Display</Text>
            <ScrollView style={{ marginTop: '10%' }}>
              {WIDGETS.map((item, index) => (
                updateWidgets(index),
                <View style={{ flexDirection: 'row' }} key={index}>
                  <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                  <SwitchComp name={item.title} index={index} />
                </View>
              ))}
            </ScrollView>

            <Pressable
              style={global.button}
              onPress={() => {
                setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
                setHomeFiltersModelVisible(false);
                setWidgets(tempWidgets);
                navigation.navigate('Home');
            }}>
            <Text style={global.buttonText}>OK</Text>
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
    flex: 0.7,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '10%', 
    //alignItems: 'center',
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