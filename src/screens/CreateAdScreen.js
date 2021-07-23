import React, { useState } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary}  from 'react-native-image-picker'
import firebase from 'firebase';
const CreateAdScreen = ()=>{

    const [name, setName] = useState(''); 
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');

    const postData = async () => {
        if(name.length > 0 && desc.length > 0 && year.length > 0 && price.length > 0 && phone.length > 0){
            await firebase.firestore().collection('ads').add({
                name,
                desc,
                year,
                phone,
                image:"",
                uid: firebase.auth().currentUser.uid,
            }).then((res) => {
                setName('');
                setDesc('');
                setYear('');
                setPrice('');
                setPhone('');
                Alert.alert("Ad posted Successfully");
            }).catch(err => {
                console.log(err);
                Alert.alert("Ad not posted Successfully");
            })

            


        } else{
            Alert.alert("Please fill all the required fields");
        }
    }
    const openCamera = () => {
        launchCamera({
            quality: 0.5
        }, (fileobj)=>{
            console.log(fileobj);
        })
    }
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Create Ad </Text>
                <TextInput mode="outlined" label="Title" value={name} onChangeText={text => setName(text)}/>
                <TextInput
                label="Describe what you are selling"
                value={desc}
                mode="outlined"
                numberOfLines={3}
                multiline={true}
                onChangeText={text => setDesc(text)}
                />
                <TextInput mode="outlined" label="Year of Purchase" value={year} keyboardType="numeric" onChangeText={text => setYear(text)}/>            
                <TextInput mode="outlined" label="Price in INR" value={price} keyboardType="numeric" onChangeText={text => setPrice(text)}/>            
                <TextInput mode="outlined" label="Contact No." value={phone} keyboardType="numeric" onChangeText={text => setPhone(text)}/>            
                <Button icon="image"  mode="contained" onPress={() =>openCamera()}> Upload Image</Button>
                <Button  mode="contained" onPress={() => postData()}> Create Ad </Button>
                </View>
        )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:30,
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22,
        textAlign:"center"
    },
    textColor:{
        color:"white",
    }
})

export default CreateAdScreen
