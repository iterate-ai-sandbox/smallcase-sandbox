import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SortingTypes {
  sortingtype: string;
  cagrTime: string;
}

const initialState: SortingTypes = {
  sortingtype: "Popularity",
  cagrTime: "1Y",
};

export const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    addSorting: (state, action: PayloadAction<SortingTypes>) => {
      state.sortingtype = action.payload.sortingtype;
      state.cagrTime = action.payload.cagrTime;
    },
  },
});

export const { addSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
