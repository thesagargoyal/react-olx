import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Platform, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
require("firebase/firestore")
require("firebase/firebase-storage")

const CreatePostScreen = ({navigation}) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(caption && image){
            setLoader(true);
        }
    })

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {

      const response = await fetch(result.uri);
      const blob = await response.blob();

      const task = firebase
          .storage()
          .ref()
          .child(`/items/${Date.now()}`)
          .put(blob);

      const taskProgress = snapshot => {
          console.log(`transferred: ${snapshot.bytesTransferred}`)
      }

      const taskCompleted = () => {
          task.snapshot.ref.getDownloadURL().then((snapshot) => {
              setImage(snapshot);
          })
      }

      const taskError = snapshot => {
          console.log(snapshot)
      }

      task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
  };

  const postData = async () => {
    if (
      caption.length > 0
    ) {
      await firebase
        .firestore()
        .collection("ads")
        .add({
          caption,
          image,
          uid: firebase.auth().currentUser.uid,
        })
        .then((res) => {
          setCaption("");
          setImage(null);
          setLoader(false);
          navigation.navigate("Home");
          Alert.alert("Posted Successfully");
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("Something went wrong");
        });
    } else {
      Alert.alert("Please fill all the required fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1, margin:20}}>
      <Text style={styles.text}> Create Post </Text>
      </View>
      <View style={{flex:2}}>
      <TextInput
        label="Caption..."
        value={caption}
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        onChangeText={(text) => setCaption(text)}
      />
      </View>
      <View style={styles.imageContainer}>
      {image && <Image style={{height:"100%", width:"100%"}} source={{ uri: image }} />}
      </View>
      <View style={{flex:1.5, justifyContent:"center"}}>
      <Button icon="image" disabled={image?true:false}  mode="contained" onPress={() => pickImage()}>
        {image ? "Uploaded" : "Upload Image"}
      </Button>
      </View>
      <View style={{flex:1.5, justifyContent:"center"}}>
      <Button disabled={!loader?true : false} mode="contained" onPress={() => postData()}>
        Upload
      </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
  textColor: {
    color: "white",
  },
  imageContainer: {
    flex: 4,
  }
});

export default CreatePostScreen;
