import _ from "lodash";

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

import { _clearLocalNotification, _setLocalNotification } from "../utils/helpers";

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

import { green, red, black, purple, white } from "../utils/colors";

// hidden answer follows similar code to https://reactnativecode.com/hide-show-view-component-button-onpress/
class QuizView extends Component {
  constructor() {
    super();

    this.state = {
      answer: false,
      index: 0,
      correct: 0,
      incorrect: 0
    };
  }

  _showHideAnswer = () => {
    if (this.state.answer == true) {
      this.setState({ answer: false });
    } else {
      this.setState({ answer: true });
    }
  };

  render() {
    const { navigation, decks } = this.props;
    const { index, answer, correct, incorrect } = this.state;
    const _cards = navigation.getParam("_cards", "Error with cards");
    const _deckTitle = navigation.getParam("_deckTitle", "Error with title");
    const _deckCardCount = decks[_deckTitle].questions.length;

    // remove notification for the day
    _clearLocalNotification().then(_setLocalNotification);

    // console.log(correct);
    return (
      <View style={styles.container}>
        {correct + incorrect === _cards.length && (
          <View style={styles.container}>
            <Text h3 style={[styles.txt, styles.bump]}>
              Your Score: {correct} / {index + 1}
            </Text>
            <Button
              raised
              icon={{ name: "cached", color: white }}
              title="Restart Quiz"
              buttonStyle={[styles.btn, styles.btnBlack]}
              textStyle={{ textAlign: "center", color: white }}
              onPress={() =>
                this.props.navigation.push("QuizView", {
                  _deckTitle,
                  _cards: decks[_deckTitle].questions
                })
              }
            />
            <Button
              raised
              icon={{ name: "cached", color: white }}
              title="Back to Deck"
              buttonStyle={[styles.btn, styles.btnBlack]}
              textStyle={{ textAlign: "center", color: white }}
              onPress={() =>
                this.props.navigation.navigate("DeckView", {
                  _deckTitle
                })
              }
            />
          </View>
        )}

        <Text h3 style={styles.bump}>
          {_cards[index].question}
        </Text>
        {answer ? (
          <Text style={[styles.txt, styles.bump]}>{_cards[index].answer}</Text>
        ) : null}
        <Button
          raised
          title="Answer"
          buttonStyle={[styles.btn, styles.btnWhite]}
          textStyle={{ textAlign: "center", color: black }}
          onPress={this._showHideAnswer}
        />
        {index + 1 <= _cards.length && (
          <Button
            raised
            disabled={correct + incorrect === _cards.length ? true : false}
            icon={{ name: "check", color: black }}
            title="Correct"
            buttonStyle={[styles.btn, styles.btnGreen]}
            textStyle={{ textAlign: "center", color: black }}
            onPress={() => {
              const { navigation } = this.props;
              const _cards = navigation.getParam("_cards", "Error with cards");

              if (this.state.index + 1 < _cards.length) {
                this.setState({
                  correct: this.state.correct + 1,
                  index: this.state.index + 1
                });
              } else {
                this.setState({
                  correct: this.state.correct + 1
                });
              }
            }}
          />
        )}
        {index + 1 <= _cards.length && (
          <Button
            raised
            disabled={correct + incorrect === _cards.length ? true : false}
            icon={{ name: "close", color: white }}
            title="Incorrect"
            buttonStyle={[styles.btn, styles.btnRed]}
            textStyle={{ textAlign: "center", color: white }}
            onPress={() => {
              const { navigation } = this.props;
              const _cards = navigation.getParam("_cards", "Error with cards");

              if (this.state.index + 1 < _cards.length) {
                this.setState({
                  incorrect: this.state.incorrect + 1,
                  index: this.state.index + 1
                });
              } else {
                this.setState({
                  incorrect: this.state.incorrect + 1
                });
              }
            }}
          />
        )}
        <Text h4>
          {index + 1} / {_cards.length}
        </Text>
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
  btnBlack: {
    backgroundColor: black
  },
  btnGreen: {
    backgroundColor: green
  },
  btnRed: {
    backgroundColor: red
  },
  btnWhite: {
    backgroundColor: white
  },
  bump: {
    marginBottom: 50
  },
  txt: {
    color: red,
    textAlign: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(QuizView);
