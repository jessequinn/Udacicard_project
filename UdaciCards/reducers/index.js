import _ from "lodash";

import {
  GET_DECKS_SUCCESS,
  ADD_DECK_SUCCESS,
  ADD_CARD_SUCCESS
} from "../actions";

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS_SUCCESS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK_SUCCESS:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      };
    case ADD_CARD_SUCCESS:
      return _.mapValues(state, deck => {
        if (deck.title === action.deck.title) {
          return {
            ...deck,
            questions: [
              ...deck.questions,
              {
                question: action.deck.questions[0].question,
                answer: action.deck.questions[0].answer
              }
            ]
          };
        } else {
          return deck;
        }
      });
    default:
      return state;
  }
};

const deck = (state = {}, action) => {
  switch (action.type) {
    case ADD_CARD_SUCCESS:
    default:
      return state;
  }
};

export default decks;
