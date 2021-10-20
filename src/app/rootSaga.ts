import {all} from 'redux-saga/effects';
import {usersWatcher} from "./sagas/user-saga";

export function* rootSaga() {
  yield all([
    usersWatcher(),
  ])
}