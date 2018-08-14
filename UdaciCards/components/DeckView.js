import _ from "lodash";

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

// UI
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Badge,
  Text
} from "react-native-elements";

import { white, black, orange, blue, purple } from "../utils/colors";

class DeckView extends Component {
  render() {
    const { navigation, decks } = this.props;
    const _deckTitle = navigation.getParam("_deckTitle", "Error with title");
    const _deckCardCount = decks[_deckTitle].questions.length;

    // console.log(decks);

    return (
      <View style={styles.container}>
        <Text h2>{_deckTitle}</Text>

        <Badge containerStyle={styles.badge}>
          <Text>
            {_deckCardCount >= 2 || _deckCardCount === 0
              ? `${_deckCardCount} cards`
              : `${_deckCardCount} card`}
          </Text>
        </Badge>

        <Button
          raised
          icon={{ name: "add-box", color: black }}
          title="Add Card"
          buttonStyle={[styles.btn, styles.btnWhite]}
          textStyle={{ textAlign: "center", color: black }}
          onPress={() =>
            this.props.navigation.navigate("AddCard", {
              _deckTitle
            })
          }
        />
        {_deckCardCount >= 1 && (
          <Button
            raised
            icon={{ name: "cached", color: white }}
            title="Start Quiz"
            buttonStyle={[styles.btn, styles.btnBlack]}
            textStyle={{ textAlign: "center", color: white }}
            onPress={() =>
              this.props.navigation.navigate("QuizView", {
                _deckTitle,
                _cards: decks[_deckTitle].questions
              })
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: white
  },
  btn: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: black
  },
  btnWhite: {
    backgroundColor: white
  },
  btnBlack: {
    backgroundColor: purple
  },
  badge: {
    borderRadius: 10,
    marginBottom: 150,
    backgroundColor: purple
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckView);
