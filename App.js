import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import Storage from './src/service/StorageService'
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import UserInputModal from './src/components/UserInputModal';
import UsersDetailCard from './src/components/UsersDetailCard';

const App = () => {

  const [userDetails, setUserDetails] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        let data = await Storage.get("TEST8")
        if( data !== undefined || data !== null) {
          setUserDetails(data)
          setFilteredDetails(data)
        }
        console.log("data retrived | user details = ", userDetails)
  
      } catch(err) {
        console.log("Error retriving data from local storage = ",err)
      }
    };
    
    getUserData();
    
  }, [])

  const filterUserDetails = (searchQuery) => {
    // filter user details based on search query 
    setQuery(searchQuery);
    console.log("Filter data based on query = ",searchQuery.toLowerCase())
    if(userDetails !== null || userDetails !== undefined) {
      try{
        const newArr = userDetails.filter((obj) => {
          // console.log("filtered data country name= ", x.country_name.toLowerCase());
          return (String(obj.country_name).trim().toLowerCase().includes(searchQuery.trim().toLowerCase()) || String(obj.phone_brand).trim().toLowerCase().includes(searchQuery.trim().toLowerCase())) 
        })
        console.log("filtered data = ", newArr)
  
        setFilteredDetails(newArr)
  
      } catch(err) {
        console.log("No match Found = ",err)
      }
    } else {
      console.log("No details found")
    }
    
  }

  

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.header}>Users Detail</Text>
      <View style={{ borderColor: '#1469AF', borderWidth: 1}}>
        <TouchableOpacity style={{flexDirection: 'row', padding: 5}} onPress={() => setShowModal(true)}>
          <Text style={{ fontSize: 15, color: '#1469AF', marginTop: 2}}>Add Entry</Text>                     
          <Icon name="plus" size={20} color="blue" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <View style= { styles.searchBar }>
        <Feather name="search" style={ styles.iconStyle } />
        <TextInput
          style={styles.inputStyle}
          placeholder='Search with country, phone brand'
          autoCapitalize= 'none'
          autoCorrect={ false }
          value={query}
          onChangeText = {(value) => {
            filterUserDetails(value);
          }}
        />
      </View>


      { userDetails !== null ? 
      <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>
        {filteredDetails.map(item => (
          <UsersDetailCard 
            detail={item}
            key={item.key}
          />
        ))}
      </ScrollView> 
      :
      <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center'}}> 
        <Text style={{ fontSize: 20 , padding: 10, textAlign: 'center'}}>No user record found. {"\n"} Please press {'\"+\"'} sign to add new record.</Text>
      </View>
      }
    </View>

    <UserInputModal isVisible={showModal} onClose={(value) => setShowModal(value)} addData={(value) => {
      console.log("value to add = ", value);
      // console.log("initial value = ", ...userDetails);
      if(userDetails === null || userDetails === []) {
        setFilteredDetails([value])
        setUserDetails([value]);
      } else{
        setFilteredDetails([value, ...userDetails]);
        setUserDetails([value, ...userDetails]);
      }

      setQuery('');
    }} />

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  header: {
    marginTop: '15%',
    fontSize: 30,
    color:'red',
    paddingBottom: 10
  },
  searchBar: {
    marginTop: 5,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
  },
  inputStyle: {
      flex: 1,
      fontSize: 15,
      paddingRight: 15,
  },
  iconStyle: {
      fontSize: 22,
      color: 'black',
      alignSelf: 'center',
      marginHorizontal: 15
  }

});

export default App;
