import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';

const CreateAdScreen = ()=>{

    const [name, setName] = useState(''); 
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');

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
                <Button icon="image"  mode="contained" onPress={() => console.log('Pressed')}> Upload Image</Button>
                <Button  mode="contained" onPress={() => console.log('Pressed')}> Create Ad </Button>
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
