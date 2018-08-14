import _ from "lodash";

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";

import { List, ListItem, TouchableHighlight } from "react-native-elements";
import { white, black, lightPurp, orange, blue } from "../utils/colors";
import { Constants } from "expo";

import { connect } from "react-redux";
import { _getDecks } from "../actions";

import { DECKS_STORAGE_KEY, _clearLocalNotification } from "../utils/helpers";

// UI
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// initialization of decks follows sample here: https://stackoverflow.com/questions/33553112/react-native-asyncstorage-fetches-data-after-rendering/33644537
class Decks extends Component {
  // in case of error with DB, clear all contents for a specific key.
  _clear = async () => {
    try {
      await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
    } catch (error) {
      alert(error);
    }
  };

  _setDefaultValues = async () => {
    try {
      let decks = {
        React: {
          title: "React",
          questions: [
            {
              question: "What is React?",
              answer: "A library for managing user interfaces"
            },
            {
              question: "Where do you make Ajax requests in React?",
              answer: "The componentDidMount lifecycle event"
            }
          ]
        },
        JavaScript: {
          title: "JavaScript",
          questions: [
            {
              question: "What is a closure?",
              answer:
                "The combination of a function and the lexical environment within which that function was declared."
            }
          ]
        }
      };

      await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
      this.props.dispatch(_getDecks(decks));
    } catch (error) {
      // console.log(error);
    }
  };

  _loadInitialDecks = async () => {
    try {
      let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
      let parsed_decks = JSON.parse(decks);
      //console.log(parsed_decks);

      if (Object.keys(parsed_decks).length === 0) {
        this._setDefaultValues();
      } else {
        this.props.dispatch(_getDecks(parsed_decks));
      }
    } catch (error) {
      this._setDefaultValues();
      // console.log(error);
    }
  };

  componentWillMount() {
    // this._clear();
    // _clearLocalNotification();
    this._loadInitialDecks().done();
  }

  render() {
    const { decks } = this.props;

    // console.log(decks);
    return (
      <View style={styles.container}>
        <ScrollView>
          <List>
            {Object.keys(decks).map((item, i) => (
              <ListItem
                component={TouchableOpacity}
                key={i}
                title={decks[item].title}
                subtitle={
                  _.has(decks[item], "questions")
                    ? `${decks[item].questions.length} cards`
                    : "0 cards"
                }
                hideChevron
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    _deckTitle: decks[item].title
                  })
                }
              />
            ))}
          </List>
        </ScrollView>
      </View>
    );
    w;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight0,
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
    backgroundColor: black
  },
  badge: {
    borderRadius: 10,
    marginBottom: 150,
    backgroundColor: lightPurp
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
