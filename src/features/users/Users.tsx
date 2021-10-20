import React, {FC, useCallback, useState} from 'react';
import {Box, Button, List, ListItem, Modal, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  selectSelectedUser,
  selectUsers,
  selectUsersLoadingError,
  selectUsersLoadingState,
  UsersActions
} from "./userSlice";

const Users: FC = () => {
  const users = useAppSelector(selectUsers)
  const selectedUser = useAppSelector(selectSelectedUser)
  const isLoading = useAppSelector(selectUsersLoadingState)
  const errorMessage = useAppSelector(selectUsersLoadingError)
  const dispatch = useAppDispatch()

  const [limit, setLimit] = useState<number>(10)

  const onClick = useCallback(() => {
    dispatch({type: 'FETCH_USERS', payload: {limit}})
  }, [limit])

  const handleClickUser = useCallback((id: number) => () => {
    dispatch({type: 'FETCH_USER', payload: id})
  }, [])

  if (isLoading) {
    return <Typography variant={'h5'} component={'div'} sx={{ my: 5 }}>Loading...</Typography>
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
        <TextField
          variant={'outlined'}
          value={limit}
          type={'number'}
          onChange={(e) => setLimit(+e.target.value)}
          label={'Limit'}
          size={'small'}
          error={limit > 10 || limit < 1}
          helperText={limit > 10 ? 'Max value 10' : limit < 1 ? 'Min value 1' : ''}
        />
        <Button disabled={limit > 10 || limit < 1} color={'primary'} variant={'contained'} onClick={onClick}>fetch all</Button>
      </Box>
      {errorMessage && <Typography variant={'body1'} component={'div'} color={'error'}>{errorMessage}</Typography>}
      {users.length > 0 && (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Typography component={'div'} variant={'body1'}>{user.id}: {user.name} ({user.email})</Typography>
              <Button onClick={handleClickUser(user.id)}>Details</Button>
            </ListItem>
          ))}
        </List>
      )}
      <Modal
        open={!!selectedUser}
        onClose={() => dispatch(UsersActions.setSelectedUser(null))}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedUser?.id}: {selectedUser?.name} ({selectedUser?.email})
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Users;