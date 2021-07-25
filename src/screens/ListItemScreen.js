import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import firebase from "firebase";
const ListItemScreen = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const getAds = async () => {
    const querySnap = await firebase.firestore().collection("ads").get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    setItems(result);
  };

  const likePost=()=>{
    console.log("pressed")
  }

  useEffect(() => {
    getAds();
    return () => {

    };
  });


  const render = (item) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.caption} />
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button onPress={()=>likePost()}>Like</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.image}
        renderItem={({ item }) => render(item)}
        onRefresh={() => {
          setLoading(true);
          getAds();
          setLoading(false);
        }}
        refreshing={loading}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
  },
});

export default ListItemScreen;
