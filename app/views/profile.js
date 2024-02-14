import Footer from '../Components/Footer';
import React, { useContext, useState } from 'react';
import { Text, View, ScrollView, Pressable, TextInput, Modal } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import global from '../Genstyle';
import SwitchComp from '../Components/UpdateAllergyPrefSwitch';
import Accordion from 'react-native-collapsible/Accordion';
import BannerTitle from '../Components/Banner';
import DownArrowIcon from '../assets/svg/downArrow';
import SignInModal from '../Components/SignInModal';
import { Context } from '../Context';
import { useNavigation } from '@react-navigation/core';
import ChangePasswordModal from '../Components/ChangePasswordModal';
import MessageModal from '../Components/MessageModal';
import Test from './Test';

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
];

export default function Profile() {
  const [activeSections, setActiveSections] = useState([]);
  const {username,setUsername,email,setEmail,setChangePasswordModalVisible} = useContext(Context);
  const [newEmail, setNewEmail] = useState(email);
  const navigation = useNavigation();
  const [isProfileModified, setIsProfileModified] = useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

  const handleEmailChange = (newEmail) => {
    setNewEmail(newEmail);
    setIsProfileModified(true);
  };
  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    setIsProfileModified(true);
  };
  const handleUpdateAccount = async () => {
    const data = await fetch(API_BASE+"/user/update-user", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({oldEmail: email, newEmail: newEmail, username: username})
    })
    setEmail(newEmail);
    setIsProfileModified(false);
  };

  const renderHeader = (section) => {
    return (
      <View style={global.horizontal}>
        <Text style={global.bodyText}>{section.title}</Text>
        <DownArrowIcon style={styles.arrowIcon}></DownArrowIcon>
      </View>
    );
  };

  const {profileAllergies, setProfileAllergies} = useContext(Context)

  const updateProfileAllergies = async () => {
    const data = await fetch(API_BASE + "/user/update-user-allergies", {
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify({ email: email, allergies: profileAllergies }),
    });
    // Handle the response from the server
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
            <SwitchComp name={item.title} index={index} state={profileAllergies[index]}> </SwitchComp>
          </View>
        ))}
        <Pressable
                    style={global.button}
                    onPress={() => {
                      updateProfileAllergies();
                    }}>
                        <Text style={styles.guestText}>Save</Text>
          </Pressable>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <View style={global.whiteBackground}>
      <BannerTitle title="Profile" />
      <ScrollView>
      
      <View style={global.grayForeground}>
          <Text style={global.titleText}>Testy Model</Text>
          <Pressable
            style={global.buttonMinor}
            onPress={() => {
              navigation.navigate('Test');
            }}>
                <Text style={styles.guestText}>Testy Model</Text>
          </Pressable>
        </View>

        <View style={global.grayForeground}>
          <Text style={global.titleText}>Preferences</Text>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
            />
        </View>

        <View style={global.grayForeground}>
          <Text style={global.titleText}>Your Recipes</Text>
          <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      navigation.navigate('Created');
                    }}>
                        <Text style={styles.guestText}>Created</Text>
          </Pressable>
          <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      navigation.navigate('Completed');
                    }}>
                        <Text style={styles.guestText}>Completed</Text>
          </Pressable>
          <Pressable
                    style={global.button}
                    onPress={() => {
                      navigation.navigate('Upload');
                    }}>
                        <Text style={styles.guestText}>Upload</Text>
          </Pressable>

        </View>


        <View style={global.grayForeground}>
          <Text style={global.titleText}>Account Settings</Text>
          <Text style={global.subheaderText}>Email</Text>
          <TextInput style={global.input} value={newEmail} onChangeText={handleEmailChange}></TextInput>
          <Text style={global.subheaderText}>Username</Text>
          <TextInput style={global.input} value={username} onChangeText={handleUsernameChange}></TextInput>
          {isProfileModified && (
            <Pressable
              style={global.button}
              onPress={() => {
                handleUpdateAccount();
                setMessageModalVisible(true);
              }} >
              <Text style={styles.guestText}>Update Account</Text>
            </Pressable>
          )}

          <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      setChangePasswordModalVisible(true)
                    }}>
                        <Text style={styles.guestText}>Change Password</Text>
          </Pressable>

          <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      navigation.navigate('Login');
                      setEmail('');
                      setUsername('');
                    }}>
                        <Text style={styles.guestText}>Logout</Text>
          </Pressable>

          <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      navigation.navigate('Home');
                    }}>
                        <Text style={styles.guestText}>Delete Account </Text>
          </Pressable>
          
          <ChangePasswordModal blurb="Change Password"/>
          {/* <MessageModel blurb="Account Settings Updated" /> */}

        </View>

      </ScrollView>
      {/* {email === 'Guest' ? <SignInModel blurb="In order to use this feature, you have to be signed in!" /> : <View></View>} */}
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
