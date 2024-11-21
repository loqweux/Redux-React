import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    coffees: [],
    desserts: [],
    snacks: [],
  },
  reducers: {
    setData: (state, action) => {
      state.coffees = action.payload.coffees;
      state.desserts = action.payload.desserts;
      state.snacks = action.payload.snacks;
    },
  },
});

export const { setData } = dataSlice.actions;
export const selectCoffees = (state) => state.data.coffees;
export const selectDesserts = (state) => state.data.desserts;
export const selectSnacks = (state) => state.data.snacks;
export default dataSlice.reducer;
