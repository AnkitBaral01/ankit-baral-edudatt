import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import schoolReducer from './slices/school.slice';
import eventReducer from './slices/event.slice';
import notificationReducer from './slices/notification.slice';
import classNewsReducer from './slices/class-news.slice';
import attendanceReducer from "./slices/attendance.slice";
import progressReducer from './slices/progress-card.slice';

export const resetState = () => ({ type: 'RESET' });

const combinedReducer = combineReducers({
  auth: authReducer,
  school: schoolReducer,
  event: eventReducer,
  notification: notificationReducer,
  classNews: classNewsReducer,
  attendance: attendanceReducer,
  progress: progressReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
