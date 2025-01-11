import {createSlice} from '@reduxjs/toolkit';

interface ICreateSlice {
  value: number;
}

const initialState: ICreateSlice = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
