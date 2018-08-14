import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { _setLocalNotification } from "./utils/helpers";

// navigation
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { Notifications } from "expo";

import { black, purple, white } from "./utils/colors";

// views
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import QuizView from "./components/QuizView";

// UI
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        headerTitle: "New Deck",
        tabBarLabel: "AddDeck",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="add-box" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      labelStyle: {
        color: black
      },
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTitle: "Deck",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTitle: "Deck Contents",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTitle: "Quiz",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: "Add New Card",
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default class App extends Component {
  componentDidMount() {
    _setLocalNotification();

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Notification (${origin}) with data: ${JSON.stringify(data)}`);
  };

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
