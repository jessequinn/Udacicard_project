import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

// helpers
import { _saveDeckTitle, _addCardToDeck } from "../utils/helpers";

import { _addCard } from "../actions";

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

// following form design from https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
import t from "tcomb-form-native";

import { white, black, purple } from "../utils/colors";

// related to form setup

const Form = t.form.Form;

const _cardQuestion = t.struct({
  question: t.String,
  answer: t.String
});

const _formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: purple,
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const _options = {
  fields: {
    question: {
      error: "You will need a question!",
      label: "What is the question for your new card?"
    },
    answer: {
      error: "You will need an answer to your question!",
      label: "What is the answer to your new card?"
    }
  },
  stylesheet: _formStyles
};

class AddCard extends Component {
  _handleSubmit = () => {
    const value = this._form.getValue();
    if (value) {
      const { navigation } = this.props;
      const _deckTitle = navigation.getParam("_deckTitle", "Error with title");

      _deck = {
        title: _deckTitle,
        questions: [
          {
            question: value.question,
            answer: value.answer
          }
        ]
      };

      _addCardToDeck(_deck.title, _deck.questions[0]);

      // console.log(_deck);
      this.props.dispatch(_addCard(_deck));
      // console.log(this.props.decks);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => (this._form = c)}
          type={_cardQuestion}
          options={_options}
        />
        <Button
          raised
          title="Submit"
          buttonStyle={styles.btn}
          textStyle={{ textAlign: "center", color: white }}
          onPress={this._handleSubmit}
        />
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
    borderColor: black,
    backgroundColor: purple
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(AddCard);
