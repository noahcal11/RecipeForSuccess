import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, TextInput } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

EStyleSheet.build();

const SearchFilterModel = ({ blurb }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleModal = () => setModalVisible(() => !modalVisible);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={global.titleText}>{blurb}</Text>
                        
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
    },
    searchInput: {
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: '1.25rem',
        //width: '100%',
        width: '25rem', // Adjust the width as needed
        height: '2.1rem',
        borderWidth: '0.1rem',
        borderColor: 'gray',
        borderRadius: 25,
        padding: '.25rem',
    },
});

export default SearchFilterModel;