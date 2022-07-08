import React, { Component } from "react";
import { View, Animated } from "react-native";

class Ball extends Component {
  position = new Animated.ValueXY({ x: 0, y: 0 });

  componentDidMount() {
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "black",
  },
};

export default Ball;
