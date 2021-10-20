import {IUser} from "./types/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

interface UserState {
  users: IUser[]
  selectedUser: IUser | null
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: '',
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },
    setSelectedUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  }
});

export const UsersActions = userSlice.actions

export const selectUsers = (state: RootState): IUser[] => state.users.users
export const selectSelectedUser = (state: RootState): IUser | null => state.users.selectedUser
export const selectUsersLoadingError = (state: RootState): string => state.users.error
export const selectUsersLoadingState = (state: RootState): boolean => state.users.isLoading

export default userSlice.reducer
