import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { View, Switch, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


EStyleSheet.build();

const DietSwitchComp = ({ name, index, state }) => {
  const { uploadDiet, setuploadDiet } = useContext(Context)
  const [isEnabled, setIsEnabled] = useState(state);
  

  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    updateDiet(index, newState);
 };

  function updateDiet(index, value) {
    const toggleToggle = uploadDiet.map((c, i) => {
      if (i === index) {
        // Flip the true/false value
        return value;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setuploadDiet(toggleToggle);
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


export default DietSwitchComp;