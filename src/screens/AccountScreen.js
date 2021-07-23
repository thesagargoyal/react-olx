import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';

const AccountScreen = ()=> {

        return (
            <View>
                <Text>{firebase.auth().currentUser.email}</Text>
                <Button  mode="contained" onPress={() => firebase.auth().signOut()}> Log Out </Button>
            </View>
        )

}
export default AccountScreen;
