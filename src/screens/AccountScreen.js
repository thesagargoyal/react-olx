import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import firebase from "firebase";

const AccountScreen = () => {


  const buttonRipple = {
    color: "gray",
    borderless: false,
  };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const showConfirmDialog = (uri) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want delete this post ?",
      [
        {
          text: "Yes",
          onPress: () => {
            var task = firebase
              .firestore()
              .collection("posts")
              .where("image", "==", uri);
            task.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
            var deleteThisImage = firebase.storage().refFromURL(uri);

            deleteThisImage
              .delete()
              .then(function () {})
              .catch(function (error) {
                console.log(error);
              });
            Alert.alert("Success!!", "Post deleted successfully...");
          },
        },

        {
          text: "No",
        },
      ]
    );
  };

  const logOut = () => {
    return Alert.alert("Are your sure?", "Are you sure you want to Log Out ?", [
      {
        text: "Yes",
        onPress: () => {
          console.log("Logging out...");
          firebase.auth().signOut();
        },
      },

      {
        text: "No",
      },
    ]);
  };

  const getPost = async () => {
    const querySnap = await firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    setItems(result);
  };

  const getEmail = () => {
    setEmail(firebase.auth().currentUser.email);
  };

  useEffect(() => {
    getPost();
    getEmail();
    return () => {};
  }, []);

  const render = (item) => {
    return (
      <Card key={item.image} style={styles.postContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>{item.caption}</Text>
            <Text style={styles.dateText}>{item.createdAt}</Text>
          </View>
          <View style={styles.imageConatiner}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => showConfirmDialog(item.image)}
              style={{ width: "40%" }}
              android_ripple={{ borderless: "true", color: "lightgray" }}
            >
              <Text style={styles.buttonText}>Delete Post</Text>
            </Pressable>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{email}</Text>
        <Pressable
          style={styles.buttton}
          onPress={() => logOut()}
          android_ripple={buttonRipple}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Log Out</Text>
        </Pressable>
      </View>
      <View style={styles.adsText}>
        <Text style={styles.text}>Your Posts</Text>
      </View>
      <View style={styles.scroll}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.image}
          renderItem={({ item }) => render(item)}
          onRefresh={() => {
            setLoading(true);
            getPost();
            setLoading(false);
          }}
          refreshing={loading}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 5,
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "space-around",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  headerText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  scroll: {
    flex: 9,
  },
  buttton: {
    backgroundColor: "deepskyblue",
    padding: 10,
  },
  adsText: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 28,
  },
  card: {
    margin: 10,
  },
  postContainer: {
    margin: 10,
    height: 340,
    borderRadius: 15,
    elevation: 2,
  },
  imageStyle: {
    width: 280,
    height: 200,
  },
  innerContainer: {
    flex: 2,
    margin: 10,
  },
  captionContainer: {
    flex: 2,
    justifyContent: "center",
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  captionText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 10,
    color: "darkgray"
  },
  imageConatiner: {
    flex: 7,
    alignItems: "center",
    borderBottomWidth:1,
    borderColor:"lightgray"
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AccountScreen;
