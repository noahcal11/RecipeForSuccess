import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


EStyleSheet.build();

const SwitchComp = (name) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
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