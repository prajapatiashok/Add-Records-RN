import React, { useState } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Modal, Dimensions, Image, StyleSheet, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { verticalScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';


import Storage from '../service/StorageService';
const window = Dimensions.get('window');
const ratio = window.width / 421;

const UserInputModal = (props) => {

    const [ name, setName ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ phoneBrand, setPhoneBrand ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');

    const dropdownData = [
        { label: 'iPhone', value: 'iPhone' },
        { label: 'Samsung', value: 'Samsung' },
        { label: 'Nokia', value: 'Nokia' },
        { label: 'Huawei', value: 'Huawei' },
        { label: 'Oppo', value: 'Oppo' },
        { label: 'Xiaomi', value: 'Xiaomi' },
        { label: 'Lenovo', value: 'Lenovo' },
        { label: 'Vivo', value: 'Vivo' },
        { label: 'Others', value: 'Others' },
    ]


    const submitChanges = async () => {
        const usersDetail = {
            user_name: name,
            country_name: country,
            phone_brand: phoneBrand,
            phone_number: phoneNumber,
            key: Date.now()
        }

        // console.log("Users detail in modal = ", usersDetail)

        try{
            // store userDetail in local storage
            await Storage.set("TEST8", usersDetail)
        }catch(err){
            // console.log("Unable to store data locally", err)
            Alert.alert("Alert", "Unable to store data.",
                [
                    { text: 'OK', onPress: () => props.onClose(false) },
                ],
            );
        }
        props.addData(usersDetail);

        // clear the text input
        setName('');
        setCountry('');
        setPhoneBrand('');
        setPhoneNumber('');

        // close the modal
        props.onClose(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
        >
            <ScrollView>
            <KeyboardAvoidingView style={{ height: '100%' }} behavior={"height"} enabled keyboardVerticalOffset={80}>

            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22}}
            >

                <View style={styles.container}>

                    { /** heading */}
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 23 * window.width / 421,
                        width: '100%',
                        justifyContent: 'center'}}
                    >
                        <Text style={{ color: '#1469AF', fontSize: 20 * ratio, alignSelf: 'center' }}>{'User Input Modal'}</Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 21 }}
                            onPress={() => props.onClose(false)}
                        >
                            <Image
                                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', tintColor: "#000", }}
                                source={require('../../assets/icon-close.png')}
                            />   
                        </TouchableOpacity>
                    </View>

                    { /** User Input Area */}
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'center',
                    }}>

                        <InputText
                            title="Name"
                            onChangeText={(value) => setName(value)}
                            value={name}
                        />

                        <InputText
                            title="Country"
                            onChangeText={(value) => setCountry(value)}
                            value={country}
                        />

                        {/* <InputText
                            title="Phone Brand"
                            onChangeText={(value) => setPhoneBrand(value)}
                            value={phoneBrand}
                        /> */}

                        <InputText
                            title="Phone Number"
                            onChangeText={(value) => setPhoneNumber(value)}
                            value={phoneNumber}
                        />

                        <View style={styles.dropdownContainer}>
                            <RNPickerSelect
                                placeholder={{
                                    label: "Please select your favourite phone brand.",
                                    value: ""
                                }}
                                items={dropdownData}
                                onValueChange={(value) => setPhoneBrand(value)}
                            />
                        </View>

                        <View style={{ alignItems: 'center' , margin: verticalScale(20)}}>
                            <TouchableOpacity
                                disabled={name === "" || country === "" || phoneBrand === "" || phoneNumber === ""}
                                style={styles.submitButton}
                                onPress={() => submitChanges() }
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>

            </KeyboardAvoidingView>
            </ScrollView>
        </Modal>

    );
}

export default UserInputModal;

const styles = StyleSheet.create({

    submitButton: {
        height: 45,
        width: 200,
        backgroundColor: '#3e98e0',
        borderRadius: 5,
        marginTop: verticalScale(20),
        marginBottom: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    container: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 388 * ratio,
        height: 649 * ratio,
    }, 

    dropdownContainer: {
        borderColor: '#9ea7be', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginHorizontal: wp(6), 
        marginTop: hp(3),
        padding: 5,
        fontSize: 18,
    }

 })

const InputText = ({ title, onChangeText, value }) => (
    <View style={{ margin: verticalScale(20) }}>
      <Text style={{ fontSize: 18, color: '#536278', paddingBottom: 5, paddingRight: 10 }}>
        {title}:
      </Text>
      <TextInput
        editable={true}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        style={{
            padding: 5,
            fontSize: 18,
            color: '#1b3964',
            backgroundColor: 'white',
            borderColor: '#9ea7be',
            borderWidth: 1,
            borderRadius: 5,
        }}
      />
    </View>
  );
  
