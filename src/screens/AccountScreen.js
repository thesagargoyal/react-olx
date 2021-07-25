import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import firebase from "firebase";

const AccountScreen = () => {
  const buttonRipple = {
    color: "gray",
    borderless: false,
  };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const showConfirmDialog = (uri) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            var task = firebase
              .firestore()
              .collection("ads")
              .where("image", "==", uri);
            task.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
            var desertRef = firebase.storage().refFromURL(uri);

            desertRef
              .delete()
              .then(function () {})
              .catch(function (error) {
                console.log(error);
              });
              Alert.alert("Post deleted successfully...")
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const getAds = async () => {
    const querySnap = await firebase
      .firestore()
      .collection("ads")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    setItems(result);
  };

  const deletePost = async (uri) => {
    var task = firebase.firestore().collection("ads").where("image", "==", uri);
    task.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    var desertRef = firebase.storage().refFromURL(uri);

    desertRef
      .delete()
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAds();
    return () => {};
  });

  const render = (item) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.caption} />
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button onPress={() => showConfirmDialog(item.image)}>Delete</Button>
        </Card.Actions>
      </Card>
    );
  };

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {firebase.auth().currentUser.email}
        </Text>
        <Pressable
          style={styles.buttton}
          onPress={() => logOut()}
          android_ripple={buttonRipple}
        >
          <Text>Log Out</Text>
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
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            getAds();
            setLoading(false);
          }}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
  },
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
  },
  headerText: {
    textAlign: "center",
    fontSize: 22,
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
});

export default AccountScreen;

// <Text style={{ fontSize: 22 }}>{firebase.auth().currentUser.email}</Text>
// <Button mode="contained" onPress={() => firebase.auth().signOut()}>
{
  /* <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button onPress={() => quickDial(item.phone)}>Call Seller</Button>
        </Card.Actions>
      </Card> */
}
