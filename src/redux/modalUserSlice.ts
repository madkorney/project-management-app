import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UpdateUser = {
  name: string;
  login: string;
  password: string;
};

type ModalUser = {
  isOpen: boolean;
  isOpenUserPage: boolean;
  isModalType: boolean;
  isMessageUser: string;
  updateUserData: UpdateUser;
};

const initialState: ModalUser = {
  isOpen: false,
  isOpenUserPage: false,
  isModalType: false,
  isMessageUser: '',
  updateUserData: {
    name: '',
    login: '',
    password: '',
  },
};

const userUpdateData = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setOpenUpdateModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = true;
      state.isModalType = action.payload;
    },
    setCloseModal: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      state.updateUserData = initialState.updateUserData;
    },
    setOpenUserPage: (state, action: PayloadAction<boolean>) => {
      state.isOpenUserPage = action.payload;
    },
    setUpdateUserData: (state, action: PayloadAction<UpdateUser>) => {
      state.updateUserData = action.payload;
      state.isOpen = true;
      state.isModalType = false;
    },
    setMessageUser: (state, action: PayloadAction<string>) => {
      state.isMessageUser = action.payload;
    },
  },
});

export const {
  setOpenUpdateModal,
  setCloseModal,
  setOpenUserPage,
  setUpdateUserData,
  setMessageUser,
} = userUpdateData.actions;

export default userUpdateData.reducer;
