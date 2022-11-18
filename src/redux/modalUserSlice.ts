import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalUser = {
  open: boolean;
  textUpdate: string;
  textDelete: string;
  modalType: string;
};

const initialState: ModalUser = {
  open: false,
  textUpdate: 'Are you sure you want to update your account?',
  textDelete: 'Are you sure you want to delete your account?',
  modalType: '',
};

const userUpdateData = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setOpenUpdateModal: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.modalType = action.payload;
    },
    setCloseModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
      state.modalType = '';
    },
  },
});

export const { setOpenUpdateModal, setCloseModal } = userUpdateData.actions;

export default userUpdateData.reducer;
