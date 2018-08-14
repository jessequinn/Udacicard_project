import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { connect } from "react-redux";

// helpers
import { _saveDeckTitle, _addCardToDeck } from "../utils/helpers";

import { _addDeck, _getDecks } from "../actions";

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

const _deckTitle = t.struct({
  title: t.String
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
    title: {
      error: "You will need a title!",
      label: "What is the title of your new deck?"
    }
  },
  stylesheet: _formStyles
};

class AddDeck extends Component {
  _handleSubmit = () => {
    const value = this._form.getValue();

    if (value) {
      _saveDeckTitle(value.title);
      this.props.dispatch(_addDeck(value.title));
      // this.props.navigation.goBack();
      this.props.navigation.navigate("DeckView", {
        _deckTitle: value.title,
        _deckCardCount: 0
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={c => (this._form = c)}
          type={_deckTitle}
          options={_options}
        />
        <Button
          raised
          title="Create Deck"
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

export default connect(mapStateToProps)(AddDeck);
