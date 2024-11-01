import { configureStore } from '@reduxjs/toolkit';
import covidReducer from './covidSlice';

const store = configureStore({
  reducer: {
    covid: covidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
