import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalUser = {
  isOpenUserPage: boolean;
  isMessageUser: string;
};

const initialState: ModalUser = {
  isOpenUserPage: false,
  isMessageUser: '',
};

const userUpdateData = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setOpenUserPage: (state, action: PayloadAction<boolean>) => {
      state.isOpenUserPage = action.payload;
    },
    setMessageUser: (state, action: PayloadAction<string>) => {
      state.isMessageUser = action.payload;
    },
  },
});

export const { setOpenUserPage, setMessageUser } = userUpdateData.actions;

export default userUpdateData.reducer;
