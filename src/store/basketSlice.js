import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      const { name, ristretto, takeaway, volume } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.name === name &&
          item.ristretto === ristretto &&
          item.takeaway === takeaway &&
          item.volume === volume
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.total = (
          existingItem.price * existingItem.quantity
        ).toFixed(2);
      } else {
        const newItem = {
          ...action.payload,
          id: Date.now(),
          total: (action.payload.price * action.payload.quantity).toFixed(2),
        };
        state.items.push(newItem);
      }
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export default basketSlice.reducer;
