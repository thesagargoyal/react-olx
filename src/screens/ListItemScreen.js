import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Card} from "react-native-paper";
import firebase from "firebase";

const ListItemScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const userID = firebase.auth().currentUser.uid;


  const getPost = async () => {
    const querySnap = await firebase.firestore().collection("posts").orderBy('timeStamp', 'desc').get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());

    setItems(result);

    let postData = new Map();

    await firebase
      .database()
      .ref("likes")
      .on("value", (snap) => {
        for (var id in snap.val()) {
          postData.set(snap.val()[id].image, [
            snap.val()[id].count,
            snap.val()[id].likedBy,
            id,
          ]);
        }
      });

    setData(postData);
  };

  const updateLikes = async (uri) => {
    let id = !data ? "" : !data.has(uri) ? "" : data.get(uri)[2];
    let likedBy = !data ? [] : !data.has(uri) ? [] : data.get(uri)[1];
    let count = !data ? 0 : !data.has(uri) ? 0 : data.get(uri)[0];

    const index = likedBy.indexOf(firebase.auth().currentUser.uid);
    if (index > -1) {
      likedBy.splice(index, 1);
      count = count - 1;
      await firebase.database().ref(`likes/${id}/likedBy`).set(likedBy);
      await firebase.database().ref(`likes/${id}/count`).set(count);
      getPost();
    } else {
      count += 1;
      likedBy.push(firebase.auth().currentUser.uid);
      await firebase.database().ref(`likes/${id}/likedBy`).set(likedBy);
      await firebase.database().ref(`likes/${id}/count`).set(count);
      getPost();
    }
  };

  useEffect(() => {
    setInterval(()=>{getPost()},3000)
    return () => {};
  }, []);

  const render = (item) => {
    return (
      <Card key={item.image} style={styles.postContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.dateText}>{item.createdAt}</Text>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>{item.caption}</Text>
          </View>
          <View style={styles.imageConatiner}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {!data
                ? '0'
                : data.has(item.image)
                ? data.get(item.image)[0]
                : '0'}{' '}
              ❤️
            </Text>
            <Pressable
              onPress={() => updateLikes(item.image)}
              style={{ width: '40%' }}
              android_ripple={{ borderless: 'false', color: 'lightgray' }}>
              <Text style={styles.buttonText}>
                {!data
                  ? ''
                  : !data.has(item.image)
                  ? 'Pull to Reload'
                  : data.get(item.image)[1].indexOf(userID) > -1
                  ? 'Unlike'
                  : 'Like'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {
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
      }
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  postContainer: {
    margin: 10,
    height: 380,
    borderRadius: 15,
    elevation: 2,
  },
  imageStyle: {
    width: 280,
    height: 200,
  },
  innerContainer: {
    flex: 1,
    margin: 10,
  },
  nameContainer: {
    flex: 1,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  captionContainer: {
    flex: 2,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  captionText: {
    fontSize: 20,
  },
  dateText: {
    fontSize: 10,
    color: "darkgray"
  },
  imageConatiner: {
    flex: 6,
    alignItems: "center",
    borderBottomWidth:1,
    borderColor:"lightgray"
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ListItemScreen;
