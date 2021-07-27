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
                <Image style={{width:200,height:200}} source={require('../assets/logo.png')}/>
                
            </View>
            
            <View style={styles.box2}>
            <Text style={styles.text}>Please Login to continue</Text>
                <TextInput mode="outlined" label="Email" value={email} onChangeText={text => setEmail(text)}/>
                <TextInput mode="outlined" label="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                <Button  mode="contained" onPress={() => userLogin()}> Log In </Button>
                <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{textAlign: "center", fontWeight: "bold"}}>Don't have a account ? Sign Up !</Text></TouchableOpacity>
            </View>
            <View style={styles.author}>
                <Image source={require('../../assets/github.png')} style={styles.github} />
                <Text style={styles.githubText}>github.com/thesagargoyal</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main:{
        display:"flex",
        justifyContent:"center",
        flex:1
    },
    box1:{
        alignItems:"center",
        flex:3
    },
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        flex:5
    },
    text:{
        fontSize:22,
        textAlign: "center",
    },
    author: {
        flex:2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    github: {
        height: 40,
        width: 40,
    },
    githubText: {
        fontWeight: "bold",
        fontSize:15
    }
})
