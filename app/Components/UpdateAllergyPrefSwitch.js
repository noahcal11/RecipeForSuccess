import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { View, Switch, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const SwitchComp = ({ name, index, state }) => {
  const { booleanAllergies, setBooleanAllergies } = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(state);

  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    updateBooleanAllergies(index, newState);
  };

  function updateBooleanAllergies(index, value) {
    const toggleToggle = booleanAllergies.map((c, i) => {
      if (i === index) {
        // Flip the true/false value
        return value;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setBooleanAllergies(toggleToggle);
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

export default SwitchComp;
