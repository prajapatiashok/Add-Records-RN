import { AsyncStorage } from 'react-native';

const set = async (key, value) => {

    console.log("users detail in storage service = ", key, "\n", value)
    try{
        // checking for existing user details
        let newUsersDetail = await get(key);
        console.log("parsed details = ", newUsersDetail)
        // checking for user details in local storage
        if(!newUsersDetail || newUsersDetail === null) {
            // initializing new user detail with an empty array
            newUsersDetail = [];
        }
        newUsersDetail.push(value)

        // saving user details in local storage
        await AsyncStorage.setItem(key, JSON.stringify(newUsersDetail) )
        
    } catch(err) {
        console.log("Error setting user details to storage = ", err)
        return true;
    }

    return true;
}

const get = async (key) => {
    let data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
}

const remove = async (key) => {
    await AsyncStorage.removeItem(key).then(data => {
        if (data === null)
            return true;
    }).catch(error => {
        return false;
    });
}

export default {
    set,
    get,
    remove
}