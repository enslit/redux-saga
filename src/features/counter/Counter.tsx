import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './counterSlice';
import {Box, Button, Paper, styled, TextField, Typography} from "@mui/material";

const StyledPaper = styled(Paper)({
  padding: '20px',
})

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', mb: 5 }}>
        <Button variant={'contained'} color={'error'} onClick={() => dispatch(decrement())}>
          -
        </Button>
        <Typography component={'span'} variant={'h5'} >{count}</Typography>
        <Button variant={'contained'} color={'success'} onClick={() => dispatch(increment())}>
          +
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <TextField
          label={'Amount'}
          size={'small'}
          variant={'outlined'}
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button
          variant={'contained'}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </Button>
      </Box>
    </StyledPaper>
  );
}
