import {createSlice} from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: [],
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    removeUserData(state, action) {
      state.userData = [];
    },
  },
});

export const {setUserData, removeUserData} = userDataSlice.actions;
export default userDataSlice.reducer;
