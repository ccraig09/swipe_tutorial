import React, { useRef, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;

const Deck = (props) => {
  if (Platform.OS === "android")
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.spring();
  let deckIndex = 0;
  const [deckIndexState, setDeckIndexState] = useState(deckIndex);
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const [currentPosition] = useState(position);

  const forceSwipe = (direction) => {
    const x = direction === "left" ? -SCREEN_WIDTH - 15 : SCREEN_WIDTH + 15;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start();
    setTimeout(() => onSwipeComplete(direction), 250);
  };
  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = props;
    if (data[deckIndex]) {
      console.log("deckIndexNumber: ", deckIndex);
      console.log("deckIndexItem: ", data[deckIndex]);
      const item = data[deckIndex];
      direction === "left" ? onSwipeLeft(item) : onSwipeRight(item);
      position.setValue({ x: 0, y: 0 });
      console.log("deckIndexBefore: ", deckIndex);
      deckIndex = deckIndex + 1;
      setDeckIndexState(deckIndex);
      console.log("deckIndexAfter: ", deckIndex);
    }
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      // duration: 5000,
      useNativeDriver: false,
    }).start();
    // position.setValue({ x: 0, y: 0 });
  };

  const getCardStyle = () => {
    const rotate = currentPosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...currentPosition.getLayout(),
      transform: [{ rotate: rotate }],
    };
  };

  const renderCards = () => {
    console.log("deckIndex: ", deckIndexState);
    if (deckIndexState >= props.data.length) {
      return props.renderNoMoreCards();
    }
    return props.data
      .map((item, cardIndex) => {
        if (cardIndex < deckIndexState) {
          return undefined;
        }

        if (cardIndex === deckIndexState) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle]}
              {...panResponder.panHandlers}
            >
              {props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[
              styles.cardStyle,
              { top: 10 * (cardIndex - deckIndexState) },
            ]}
            key={item.id}
          >
            {props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };
  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: "100%",
  },
});

export default Deck;
