// NavigationBar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function NavigationBar() {
  const navigation = useNavigation();
  const [menu, setMenu] = useState(false);

  function displayNavBar() {
    if (menu) {
      return (
        <View style={styles.burgerMenu}>
          <View style={styles.pageLinks}>
            <TouchableOpacity onPress={() => {navigation.navigate("Home",{username:"Guest"})}} style={styles.linkText}>
              <Text style={styles.linkText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate("Skills")}} style={styles.linkText}>
              <Text style={styles.linkText}>Skills</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.linkText}>
              <Text style={styles.linkText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => {setMenu(!menu)}} style={styles.menuIcon}>
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => {setMenu(!menu)}} style={styles.menuIcon}>
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  return (
    <View>
      {displayNavBar()}
    </View>
  );
}

const styles = EStyleSheet.create({
  burgerMenu: {
    flexDirection: 'row',
  },
  pageLinks: {
    flex: 1,
    backgroundColor: '#DDD',
    borderWidth: '0.1rem',
    borderLeftWidth: 0,
    borderTopRightRadius: '2rem',
    borderBottomRightRadius: '2rem'
  },
  linkText: {
    flex: 1,
    fontSize: '1rem',
    padding: '0.5rem',
    paddingRight: 0
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'salmon',
  },
  menuIcon: {
    flex: 1,
    paddingLeft: 10,
  },
  menuText: {
    fontSize: 30,
    color: 'black',
  },
});