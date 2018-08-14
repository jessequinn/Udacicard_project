// To manage your AsyncStorage database, you'll want to create four different helper methods.
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
import React from "react";

import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";
import moment from "moment";

export const NOTIFICATION_KEY = "Udacicards:notifications";
export const DECKS_STORAGE_KEY = "Udacicards:key";

// no need to use as redux was used along side asyncstorage.
export function getDeck(id) {}
export function getDecks() {}
//

export function _saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    }),
    () => {
      AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        // console.log(err);
      });
    }
  );
}

export function _addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    // console.log(data[title]);
    data[title].questions.push(card);
    // console.log(data[title]);
    // data[title] = undefined;
    // delete data[title];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

// based on code from React Native lesson and https://snack.expo.io/SyChaK8Hb
export function _setLocalNotification() {
  const _localNotification = {
    title: "Do a quiz!",
    body: "Hi, don't forget to do a quiz for today!",
    data: { type: "delayed" },
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };

  // set time for next day at 9 am
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9);
  tomorrow.setMinutes(0);

  const _schedulingOptions = {
    time: tomorrow,
    repeat: "day"
  };

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      // console.info(data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          // console.info(status);
          if (status === "granted") {
            console.info(status);
            Notifications.cancelAllScheduledNotificationsAsync();

            Notifications.scheduleLocalNotificationAsync(
              _localNotification,
              _schedulingOptions
            )
              .then(id =>
                console.info(
                  `Delayed notification scheduled (${id}) at ${moment(
                    _schedulingOptions.time
                  ).format()}`
                )
              )
              .catch(err => console.error(err));

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function _clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
