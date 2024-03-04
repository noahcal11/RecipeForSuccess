import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { View, Switch, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


EStyleSheet.build();

// UploadAllergySwitch.js

const AllergySwitchComp = ({ name, index, state }) => {
  const { uploadAllergies, setUploadAllergies } = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(state);
 
  const toggleSwitch = () => {
     const newState = !isEnabled;
     setIsEnabled(newState);
     updateAllergies(index, newState);
  };
 
  function updateAllergies(index, value) {
     if (value) {
       // If the switch is turned on, add the allergy name to the array
       setUploadAllergies(prevAllergies => [...prevAllergies, name]);
     } else {
       // If the switch is turned off, remove the allergy name from the array
       setUploadAllergies(prevAllergies => prevAllergies.filter(allergy => allergy !== name));
     }
  }
 
  return (
     <Switch
       trackColor={{ false: '#767577', true: '#F67D7D' }}
       thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
       ios_backgroundColor="#3e3e3e"
       onValueChange={toggleSwitch}
       value={isEnabled}
     />
  );
 };

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
});


export default AllergySwitchComp;