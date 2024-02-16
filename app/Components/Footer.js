import React, { useContext, useState } from 'react';
import { View, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import HeartIcon from '../assets/svg/heart';
import HomeIcon from '../assets/svg/home';
import RibbonIcon from '../assets/svg/ribbon';
import HeartSelected from '../assets/svg/heartSelected';
import HomeSelected from '../assets/svg/homeSelected';
import RibbonSelected from '../assets/svg/ribbonSelected';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const Footer = () => {
  const navigation = useNavigation();
  const [selectedIcon, setSelectedIcon] = useState('Home');
  const { setRecipePageState } = useContext(Context);

  const navigateAndSetState = (page) => {
    setSelectedIcon(page);
    setRecipePageState('details');
    navigation.navigate(page);
  };

  const IconComponent = ({ page, SelectedComponent, UnselectedComponent }) => (
    <Pressable onPress={() => navigateAndSetState(page)} style={({ pressed }) => [
        { opacity: pressed ? 0.2 : 1 },
        { marginHorizontal: "12.5%" },
      ]}>
      {selectedIcon === page ? <SelectedComponent width="40" height="100" stroke="black" strokeWidth="0.25"/> : <UnselectedComponent width="40" height="100" stroke="black" strokeWidth="0.25"/>}
    </Pressable>
  );

  return (
    <View style={styles.footerContainer}>
      <IconComponent
        page="Favorites"
        SelectedComponent={HeartSelected}
        UnselectedComponent={HeartIcon}
      />
      <IconComponent
        page="Home"
        SelectedComponent={HomeSelected}
        UnselectedComponent={HomeIcon}
      />
      <IconComponent
        page="Skills"
        SelectedComponent={RibbonSelected}
        UnselectedComponent={RibbonIcon}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  footerContainer: {
    height: '8%',
    backgroundColor: '#F02727',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Footer;
