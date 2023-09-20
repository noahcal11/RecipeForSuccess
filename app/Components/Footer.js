import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Genstyle';

const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>This is the footer.</Text>
      </View>
    );
  };

  
  export default Footer;