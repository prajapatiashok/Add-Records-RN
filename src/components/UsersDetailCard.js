import React from 'react';
import { View, Text } from 'react-native';

const UsersDetailCard = (props) => {

    console.log("details here in card = ", props)

    return(
        <View style={{padding: 20}}>
            <Text>Name: {props.detail.user_name}</Text>
            <Text>Country: {props.detail.country_name}</Text>
            <Text>Phone Number: {props.detail.phone_number}</Text>
            <Text>Phone Brand: {props.detail.phone_brand}</Text>
        </View>
    );
}

export default UsersDetailCard;