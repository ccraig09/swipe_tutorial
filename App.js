import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
  },
];

class App extends Component {
  renderCard(item) {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image
          source={{ uri: item.uri }}
          resizeMode="cover"
          style={styles.image}
        />
        <Text style={{ marginBottom: 15 }}>I can customize even more...</Text>
        <Button
          icon={{ name: "code", color: "#ffffff" }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Text style={{ marginBottom: 10 }}>Theres no more content here!</Text>
        <Button backgroundColor="03A9F4" title="Get more!" />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={() => {}}
          onSwipeLeft={() => {}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
