import { Smallcase } from "@/components/discover-tabs/Smallcases";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistTypes {
  data: Smallcase[];
}

const loadState = (): WishlistTypes => {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return { data: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { data: [] };
  }
};

// Function to save state to localStorage
const saveState = (state: WishlistTypes) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishlist", serializedState);
  } catch {
    console.log("Error saving state to localStorage");
  }
};

const initialState: WishlistTypes = loadState();

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<Smallcase>) => {
      state.data.push(action.payload);
      saveState(state);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        (smallcase) => smallcase.name !== action.payload
      );
      saveState(state);
    },
  },
});

export const { addWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
