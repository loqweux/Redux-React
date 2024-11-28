import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice";
import basketReducer from "./basketSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    basket: basketReducer,
  },
});

export default store;
