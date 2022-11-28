// src/features/todo/todoSlice.js
import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import type {RootState} from '../../index';
// Define a type for the slice state

interface SliceState {
  isLoading: boolean;
}

// Define the initial state using that type
const initialState = {
  isLoading: false,
} as SliceState;

export const Slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setLoading: (state: SliceState, {payload}: {payload: boolean}) => {
      state.isLoading = payload;
    },
  },
});
// actions
export const {setLoading} = Slice.actions;

// selectors
export const loadingSelector = (state: RootState) =>
  state.application.isLoading;

export default Slice.reducer;
