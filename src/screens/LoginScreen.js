import React, {useState} from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {TextInput, Button} from 'react-native-paper';

export default function LoginScreen() {

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    return (
        <KeyboardAvoidingView style={styles.main}>
            <View style={styles.box1}>
                <Image style={{width:200,height:200}} source={require('../assets/cnqlogo.png')}/>
                <Text style={styles.text}>Please Login to continue</Text>
            </View>
            <View style={styles.box2}>
                <TextInput mode="outlined" label="Email" value={email} onChangeText={text => setEmail(text)}/>
                <TextInput mode="outlined" label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                <Button  mode="contained" onPress={() => console.log('Pressed')}> Log In </Button>
            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main:{
        display:"flex",
        justifyContent:"center"
    },
    box1:{
        alignItems:"center",
    },
    box2:{
        paddingHorizontal:40,
        height:'50%',
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22,
    }
})
