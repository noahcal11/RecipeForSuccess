import Footer from '../Components/Footer';
import React, { useContext, useState } from 'react';
import { Text, View, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import global from '../Genstyle';
import SwitchComp from '../Components/Switch';
import Accordion from 'react-native-collapsible/Accordion';
import BannerTitle from '../Components/Banner';
import DownArrowIcon from '../assets/svg/downArrow';
import SignInModel from '../Components/SignInModel';
import { Context } from '../Context';

EStyleSheet.build();

const SECTIONS = [
  {
    title: 'Select Allergies',
    content: [
      { title: 'Dairy' },
      { title: 'Eggs'},
      { title: 'Fish'},
      { title: 'Shellfish'},
      { title: 'Tree Nuts'},
      { title: 'Peanuts'},
      { title: 'Wheat'},
      { title: 'Soybeans'},
      { title: 'Chicken'},
      { title: 'Pork'},
      { title: 'Red Meat'},
      { title: 'Gluten'},
    ],
  },
  {
    title: 'Select Widgets',
    content: [
      { title: 'Favorites'},
      { title: 'Broccoli'},
      // Add more items as needed
    ],
  },
];

export default function Profile() {
  const [activeSections, setActiveSections] = useState([]);
  const {email} = useContext(Context);

  const renderHeader = (section) => {
    return (
      <View style={global.horizontal}>
        <Text style={global.bodyText}>{section.title}</Text>
        <DownArrowIcon style={styles.arrowIcon}></DownArrowIcon>
      </View>
    );
  };

  const renderContent = (section) => {
    let contentText = '';

    // Conditionally set the content text based on the section title
    if (section.title === 'Select Allergies') {
      contentText = 'Any selected ingredients will not be included in the recipes displayed.';
    } else if (section.title === 'Select Widgets') {
      contentText = 'Any selected widgets will be shown on the home screen.';
    }

    return (
      <View>
        <Text style={global.centerBodyText}>{contentText}</Text>
        {section.content.map((item, index) => (
          <View style={global.horizontal} key={index}>
            <Text style={global.bodyText}>{item.title}</Text>
            <SwitchComp name={item.title}> </SwitchComp>
          </View>
        ))}
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={global.whiteBackground}>
      <BannerTitle title="Profile" />
      <View style={global.grayForeground}>
        <ScrollView>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          />
        </ScrollView>
      </View>
      {email === 'Guest' ? <SignInModel blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
      <Footer />
    </View>
  );
}

const styles = EStyleSheet.create({
  arrowIcon: {
    height: 25,
    width: 25,
  }
});
