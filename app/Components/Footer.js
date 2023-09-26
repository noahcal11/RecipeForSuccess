import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>This is the footer.</Text>
      </View>
    );
  };
  
  
  export default Footer;

  const styles = EStyleSheet.create({
    footerContainer: {
      backgroundColor: '#F74F4F',
      padding: 10,
      alignItems: 'center',
    },
    footerText: {
      color: 'white',
      fontSize: 16,
    },
  })