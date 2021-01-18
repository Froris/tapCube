import React, { createContext, useReducer } from "react";

import {
  SET_GAME_START,
  SET_POINTS,
  CLEAR_POINTS,
  SET_GAME_END,
  SET_NEW_GAME,
  SET_CURRENT_PLAYER,
  SET_IS_FIRST_GAME,
  UPDATE_PLAYERS_LIST,
  SET_GAME_PAUSE,
  SET_GAME_RESTART,
  SET_AUTH,
} from "../actions/actionsType";

const initialState = {
  points: 0,
  isFirstGame: true,
  isNewGame: true,
  isGameStarted: false,
  isGameEnded: false,
  isGamePaused: false,
  isGameRestarted: false,
  isAuth: false,
  cubesData: [
    {
      type: "regular",
      points: 2,
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

  currentPlayer: {},
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

    case UPDATE_PLAYERS_LIST:
      return { ...state, players: action.payload.slice(0) };

    case SET_AUTH:
      return { ...state, isAuth: action.payload };

    case SET_CURRENT_PLAYER:
      return { ...state, currentPlayer: { ...action.payload } };

    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
