import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import SwitchComp from './WidgetsSwitch';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const WIDGETS = [
  { title: 'Popular' },
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

const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN

const HomeFiltersModal = () => {
  const { isHomeFiltersModelVisible, setHomeFiltersModelVisible, visibleWidgets, setVisibleWidgets, email } = useContext(Context);
  const navigation = useNavigation();

  const updateWidgets = async () => {
    await fetch(API_BASE + "/user/update-widgets/" + email, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({widgets: visibleWidgets})
    }).catch(err => console.error(err));
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
                <View style={{ flexDirection: 'row' }} key={index}>
                  <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                  <SwitchComp name={item.title} index={index} state={visibleWidgets[index]} />
                </View>
              ))}
            </ScrollView>

            <Pressable
              style={global.button}
              onPress={() => {
                setHomeFiltersModelVisible(!isHomeFiltersModelVisible);
                setHomeFiltersModelVisible(false);
                updateWidgets();
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

export default HomeFiltersModal