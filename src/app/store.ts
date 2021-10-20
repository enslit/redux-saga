import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/userSlice';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
