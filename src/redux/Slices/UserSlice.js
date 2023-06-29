import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  reducers: {
    setSignUpData(state, action) {
      state.data = action.payload;
    },
    setUserName(state, action) {
      const {FName, LName} = action.payload;
      const existingUser = state.data[0];
      existingUser.FName = FName;
      existingUser.LName = LName;
    },
    setuserEmail(state, action) {
      const {Email, Location} = action.payload;
      const existingUser = state.data[0];
      existingUser.Email = Email;
      existingUser.Location = Location;
    },
    setAddImage: (state, action) => {
      const existingUser = state.data[0];
      existingUser.images = action.payload;
    },
    setAboutYou: (state, action) => {
      const existingUser = state.data[0];
      existingUser.finalData = action.payload;
    },
    setLastQue: (state, action) => {
      const existingUser = state.data[0];
      existingUser.lastQue = action.payload;
    },
  },
});

export const {
  setSignUpData,
  setUserName,
  setuserEmail,
  setAddImage,
  setAboutYou,
  setLastQue,
} = userSlice.actions;
export default userSlice.reducer;
