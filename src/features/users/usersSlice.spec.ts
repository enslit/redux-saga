import {fetchUser, fetchUsers} from '../../app/sagas/user-saga'
import {call, put} from "redux-saga/effects";
import {UsersActions} from "./userSlice";
import usersApi from "./usersApi";

describe('users reducer', () => {
  const user = {
    id: 1,
    name: 'name',
    username: 'username',
    email: 'email',
  }
  const action = {type: 'FETCH_USERS', payload: {limit: 5}}
  const fetchUserAction = {type: 'FETCH_USER', payload: user.id}

  const fetchUsersGen = fetchUsers(action)
  const fetchUserGen = fetchUser(fetchUserAction)

  it('getUsers Saga должна включить состояние загрузки', () => {
    expect(fetchUsersGen.next().value)
      .toMatchObject(put(UsersActions.setLoadingState(true)))
  })

  it('getUsers Saga должна убрать ошибку', () => {
    expect(fetchUsersGen.next().value)
      .toMatchObject(put(UsersActions.setError('')))
  })

  it('getUsers Saga должна вызвать api с корректными аргументами', () => {
    expect(fetchUsersGen.next().value)
      .toMatchObject(call([usersApi, usersApi.getUsers], action.payload.limit))
  })

  it('getUsers Saga должна записать в store массив пользователей', () => {
    expect(fetchUsersGen.next([user]).value)
      .toMatchObject(put(UsersActions.setUsers([user])))
  })

  it('getUsers Saga должна выключить состояние загрузки', () => {
    expect(fetchUsersGen.next([]).value)
      .toMatchObject(put(UsersActions.setLoadingState(false)))
  })

  it('getUsers Saga должна быть завершена', () => {
    expect(fetchUsersGen.next([]))
      .toMatchObject({ done: true, value: undefined })
  })

  // FETCH USER
  it('getUser Saga должна включить состояние загрузки', () => {
    expect(fetchUserGen.next().value)
      .toMatchObject(put(UsersActions.setLoadingState(true)))
  })

  it('getUser Saga должна убрать ошибку', () => {
    expect(fetchUserGen.next().value)
      .toMatchObject(put(UsersActions.setError('')))
  })

  it('getUser Saga должна вызвать api с корректными аргументами', () => {
    expect(fetchUserGen.next().value)
      .toMatchObject(call([usersApi, usersApi.getUser], fetchUserAction.payload))
  })

  it('getUser Saga должна записать в store полученного пользователя', () => {
    expect(fetchUserGen.next(user).value)
      .toMatchObject(put(UsersActions.setSelectedUser(user)))
  })

  it('getUser Saga должна выключить состояние загрузки', () => {
    expect(fetchUserGen.next([]).value)
      .toMatchObject(put(UsersActions.setLoadingState(false)))
  })

  it('getUser Saga должна быть завершена', () => {
    expect(fetchUserGen.next([]))
      .toMatchObject({ done: true, value: undefined })
  })
});
