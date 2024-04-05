import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const ConfirmDeleteModal = ({ blurb }) => {
    const { isDeleteModalVisible, setDeleteModalVisible, email } = useContext(Context);
    const navigation = useNavigation();
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

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

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => {
                    setDeleteModalVisible(!isDeleteModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={global.subheaderText}>Are you sure you want to delete your account? This action is not reversible!</Text>
                        <Pressable
                            style={({ pressed }) => [
                                global.button, // Assuming styles.searchIcon contains the existing styles for the Pressable
                                {
                                  opacity: pressed ? 0.2 : 1,
                                },
                             ]}
                            onPress={() => {setDeleteModalVisible(!isDeleteModalVisible); handleDeleteAccount(); }}>
                            <Text style={global.buttonText}>Delete</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                global.buttonMinor, // Assuming styles.searchIcon contains the existing styles for the Pressable
                                {
                                  opacity: pressed ? 0.2 : 1,
                                },
                             ]}
                            onPress={() => { setDeleteModalVisible(!isDeleteModalVisible); }}>
                            <Text style={global.buttonMinorText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = EStyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: '10%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default ConfirmDeleteModal