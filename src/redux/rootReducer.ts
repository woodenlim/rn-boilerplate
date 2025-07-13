import { Action, combineReducers, Reducer } from '@reduxjs/toolkit';
import auth from '@/features/auth/authSlice';

// Combine all your reducers
const allReducer = combineReducers({
  auth,
});

// Root reducer with reset support
const rootReducer: Reducer<RootState, Action> = (state, action) => {
  if (action.type === 'reset') {
    state = undefined;
  }
  return allReducer(state, action);
};

// Define the RootState type using ReturnType
export type RootState = ReturnType<typeof allReducer>;
export default rootReducer;
