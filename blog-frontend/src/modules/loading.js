import React from 'react';
import { createAction, handleActions } from 'redux-actions';

// action type definition
const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// action creator definition
export const startLoading = createAction(
  START_LOADING,
  reqyestType => reqyestType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType,
);

// initial state definition
const initialState = {};

// reducer definition
const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
