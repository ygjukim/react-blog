import { createAction, handleActions } from 'redux-actions';

// action type definition
const SAMPLE_TYPE = 'auth/SANPLE_TYPE';

// action creator definition
export const sampleAction = createAction(SAMPLE_TYPE);

// initial state definition
const initialState = {};

// reducer definition
const auth = handleActions(
  {
    [SAMPLE_TYPE]: (state, action) => state,
  },
  initialState,
);

export default auth;
