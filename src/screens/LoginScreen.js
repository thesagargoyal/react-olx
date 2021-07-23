import React, {useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import {TextInput, Button} from 'react-native-paper';
import firebase from 'firebase';

export default function LoginScreen({navigation}) {

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const userLogin = ()=>{

        if(!email || !password)Alert.alert("Please enter required fields!");

        else{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result)=>{
                console.log("signin");
            })
            .catch((error)=>{
                Alert.alert("The password is invalid or the user does not have a password.");
            })
        }
    }

    return (
        <KeyboardAvoidingView style={styles.main}>
            <View style={styles.box1}>
                <Image style={{width:200,height:200}} source={require('../assets/cnqlogo.png')}/>
                <Text style={styles.text}>Please Login to continue</Text>
            </View>
            <View style={styles.box2}>
                <TextInput mode="outlined" label="Email" value={email} onChangeText={text => setEmail(text)}/>
                <TextInput mode="outlined" label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                <Button  mode="contained" onPress={() => userLogin()}> Log In </Button>
                <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{textAlign: "center"}}>Don't have a account ? Sign Up !</Text></TouchableOpacity>
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
