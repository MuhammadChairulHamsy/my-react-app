import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
    reducer: { cart: cartReducer },
});

console.log("oncreate :", store.getState());

// subscibe
store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
});

export default store;
