import { configureStore } from "@reduxjs/toolkit";
import { sortingSlice } from "./reducers/sorting";
import { wishlistSlice } from "./reducers/wishlist";
export const store = configureStore({
  reducer: {
    sorting: sortingSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
