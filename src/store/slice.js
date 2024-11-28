import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    coffees: [],
  },
  reducers: {
    setData: (state, action) => {
      state.coffees = action.payload.coffees;
    },
  },
});

export const { setData } = dataSlice.actions;
export const selectCoffees = (state) => state.data.coffees;
export default dataSlice.reducer;
