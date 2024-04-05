import Footer from '../Components/Footer';
import React, { useEffect, useContext, useState } from 'react';
import { Text, View, ScrollView, Pressable, TextInput, Modal, Linking } from "react-native";
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
import LoadingModal from '../Components/LoadingModal';
import MessageModal from '../Components/MessageModal';
import Test from './Test';
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal';

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

const allergenMapping = [
  'Dairy', 'Eggs', 'Fish', 'Shellfish',
  'Tree Nuts', 'Peanuts', 'Wheat', 'Soybeans',
  'Chicken', 'Pork', 'Red Meat', 'Gluten',
];

export default function Profile() {
  const [activeSections, setActiveSections] = useState([]);
  const {username,setUsername,email,setEmail,setChangePasswordModalVisible, profileAllergies, setProfileAllergies, booleanAllergies, setBooleanAllergies, isLoadingModalVisible, setLoadingModalVisible, isDeleteModalVisible, setDeleteModalVisible} = useContext(Context);
  const [newEmail, setNewEmail] = useState(email);
  const navigation = useNavigation();
  const [isProfileModified, setIsProfileModified] = useState(false);
  const [isMessageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add a loading state

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
      body: JSON.stringify({oldEmail: email, newEmail: newEmail, username: username, allergies: profileAllergies})
    })
    setEmail(newEmail);
    setIsProfileModified(false);
  };

  const handleDeleteAccount = async () => {
    const data = await fetch(API_BASE+"/user/delete/"+email, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE"
    })
    navigation.navigate('Login');
  };

  const renderHeader = (section) => {
    return (
      <View style={{...global.horizontal, marginBottom: '5%'}}>
        <Text style={global.bodyText}>{section.title}</Text>
        <DownArrowIcon style={styles.arrowIcon}></DownArrowIcon>
      </View>
    );
  };


  useEffect(() => {
    setLoading(true);
    setLoadingModalVisible(true);
    if (email === 'Guest') {
      // If the email is 'Guest', do not fetch allergies
      setLoading(false);
      setLoadingModalVisible(false);
      return;
   }

   if (email !== 'Guest') {
    // If the email is 'Guest', do not fetch allergies
    fetchData();
 }
  }, [email, setProfileAllergies]);

  useEffect(() => {
   }, [profileAllergies]);

   const fetchData = async () => {
    try {
        // Fetch all the necessary data here
        // For example:
        await getProfileAllergies();
        // ... other fetch calls
    } catch (error) {
        console.error(error);
    } finally {
        // Set loading state to false and hide the loading modal once all data is fetched
        setLoading(false);
        setLoadingModalVisible(false);
    }
};

  const getProfileAllergies = async () => {
  try {
     const response = await fetch(`${API_BASE}/user/get/${email}`, {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       method: "GET"
     });
     const data = await response.json();
     const allergies = data[0].allergies;
     // Convert the strings to booleans based on the allergenMapping
     const booleanLoadAllergies = allergenMapping.map(allergen => allergies.includes(allergen));
     setBooleanAllergies(booleanLoadAllergies);
  } catch (error) {
     console.error(error);
  }
  };


   const updateProfileAllergies = async () => {
    // Map the profileAllergies array to include only allergen names from allergenMapping
    const selectedAllergens = booleanAllergies
      .map((isSelected, index) => isSelected ? allergenMapping[index] : null)
      .filter(Boolean); // Filter out null values
      selectedAllergens.push('Test');
    // Make API call with selected allergens
    const data = await fetch(API_BASE + "/user/update-user-allergies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email, allergies: selectedAllergens }),
    });
    // Handle the response from the server
    setProfileAllergies(selectedAllergens);
  };
  
  if (loading && email !== 'Guest') {
    return (
      <View style={global.whiteBackground}>
        <View style={global.grayForeground}>
          <LoadingModal></LoadingModal>
        </View>
      </View>
    );
 }
   

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
            <SwitchComp name={item.title} index={index} state={booleanAllergies[index]}> </SwitchComp>

          </View>
        ))}
        <Pressable
                    //style={global.button}
                    style={({ pressed }) => [
                      global.button, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      updateProfileAllergies();
                    }}>
                        <Text style={global.buttonText}>Save</Text>
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
      {email === 'Guest' ? <SignInModal blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
      <ScrollView>
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
                    //style={global.buttonMinor}
                    style={({ pressed }) => [
                      global.buttonMinor, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      navigation.navigate('Created');
                    }}>
                        <Text style={global.buttonMinorText}>Created</Text>
          </Pressable>
          <Pressable
                    //style={global.buttonMinor}
                    style={({ pressed }) => [
                      global.buttonMinor, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      navigation.navigate('Completed');
                    }}>
                        <Text style={global.buttonMinorText}>Completed</Text>
          </Pressable>
          <Pressable
                    //style={global.button}
                    style={({ pressed }) => [
                      global.button, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      navigation.navigate('Upload');
                    }}>
                        <Text style={global.buttonText}>Upload</Text>
          </Pressable>

        </View>

        <View style={{ alignItems: 'center' }}>
          {isDeleteModalVisible ? <ConfirmDeleteModal /> : null}
        </View>

        <View style={global.grayForeground}>
          <Text style={global.titleText}>Account Settings</Text>
          <Text style={global.subheaderText}>Email</Text>
          <TextInput style={global.input} value={newEmail} onChangeText={handleEmailChange}></TextInput>
          <Text style={global.subheaderText}>Username</Text>
          <TextInput style={global.input} value={username} onChangeText={handleUsernameChange}></TextInput>
          {isProfileModified && (
            <Pressable
              //style={global.button}
              style={({ pressed }) => [
                global.button, 
                {
                  opacity: pressed ? 0.2 : 1,
                },
             ]}
              onPress={() => {
                handleUpdateAccount();
                setMessageModalVisible(true);
              }} >
              <Text style={global.buttonMinorText}>Update Account</Text>
            </Pressable>
          )}

          {/* <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      setChangePasswordModalVisible(true)
                    }}>
                        <Text style={styles.guestText}>Change Password</Text>
          </Pressable> */}

          <Pressable
                    //style={global.buttonMinor}
                    style={({ pressed }) => [
                      global.buttonMinor, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      setDeleteModalVisible(true);
                    }}>
                        <Text style={global.buttonMinorText}>Delete Account </Text>
          </Pressable>

          <Pressable
                    //style={global.buttonMinor}
                    style={({ pressed }) => [
                      global.buttonMinor, 
                      {
                        opacity: pressed ? 0.2 : 1,
                      },
                   ]}
                    onPress={() => {
                      navigation.navigate('Login');
                      setEmail('');
                      setUsername('');
                    }}>
                        <Text style={global.buttonMinorText}>Logout</Text>
          </Pressable>
          
          <ChangePasswordModal blurb="Change Password"/>
          {/* <MessageModel blurb="Account Settings Updated" /> */}

        </View>

      </ScrollView>
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
