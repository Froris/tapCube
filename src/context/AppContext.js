import React, { createContext, useReducer } from "react";

import {
  SET_GAME_START,
  SET_POINTS,
  CLEAR_POINTS,
  SET_GAME_END,
  SET_NEW_GAME,
  SET_IS_FIRST_GAME,
  SAVE_PLAYER,
  SAVE_LAST_PLAYER,
  GET_SAVED_PLAYERS,
  SET_GAME_PAUSE,
  SET_GAME_RESTART,
} from "../actions/actionsType";

const initialState = {
  points: 0,
  isFirstGame: true,
  isNewGame: true,
  isGameStarted: false,
  isGameEnded: false,
  isGamePaused: false,
  isGameRestarted: false,
  cubesData: [
    {
      type: "regular",
      points: 1,
    },
    {
      type: "rare",
      points: 10,
    },
    {
      type: "ssr",
      points: 50,
    },
  ],
  players: [],
  lastPlay: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GAME_START:
      return { ...state, isGameStarted: action.payload };

    case SET_GAME_END:
      return { ...state, isGameEnded: action.payload };

    case SET_NEW_GAME:
      return { ...state, points: 0, isGameStarted: false, isNewGame: true, isGamePaused: false, players: [] };

    case SET_GAME_PAUSE:
      return { ...state, isGamePaused: action.payload };

    case SET_GAME_RESTART:
      return { ...state, isGameRestarted: action.payload };

    case SET_IS_FIRST_GAME:
      return { ...state, isFirstGame: action.payload };

    case SET_POINTS:
      return { ...state, points: state.points + action.payload };

    case CLEAR_POINTS:
      return { ...state, points: 0 };

    case SAVE_PLAYER:
      return { ...state, players: action.payload };

    case SAVE_LAST_PLAYER:
      return { ...state, lastPlay: action.payload };

    case GET_SAVED_PLAYERS:
      return { ...state, players: state.players.concat(action.payload) };

    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
