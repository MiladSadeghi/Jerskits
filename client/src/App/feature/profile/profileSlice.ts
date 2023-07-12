import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfileSliceState } from "./profileSlice.types";

const initialState: IProfileSliceState = {
  username: null,
  email: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<IProfileSliceState>) => {
      Object.keys(payload).map((value: string) => {
        if (Object.prototype.hasOwnProperty.call(state, value)) {
          state[value as keyof IProfileSliceState] =
            payload[value as keyof IProfileSliceState];
        }
      });
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
