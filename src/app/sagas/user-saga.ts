import {put, call, takeLatest} from "redux-saga/effects";
import usersApi from "../../features/users/usersApi";
import {UsersActions} from "../../features/users/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export function* fetchUsers(action: PayloadAction<{limit: number}>) {
  try {
    yield put(UsersActions.setLoadingState(true))
    yield put(UsersActions.setError(''))

    const users = yield call([usersApi, usersApi.getUsers], action.payload.limit)
    yield put(UsersActions.setUsers(users))
  } catch (e) {
    yield put(UsersActions.setError(e.message))
  } finally {
    yield put(UsersActions.setLoadingState(false))
  }
}

export function* fetchUser(action: PayloadAction<number>) {
  try {
    yield put(UsersActions.setLoadingState(true))
    yield put(UsersActions.setError(''))

    const user = yield call([usersApi, usersApi.getUser], action.payload)
    yield put(UsersActions.setSelectedUser(user))
  } catch (e) {
    yield put(UsersActions.setError(e.message))
  } finally {
    yield put(UsersActions.setLoadingState(false))
  }
}

export function* usersWatcher () {
  yield takeLatest('FETCH_USERS', fetchUsers)
  yield takeLatest('FETCH_USER', fetchUser)
}
