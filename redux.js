import {legacy_createStore } from "redux";
// reducer
const cartReducer = (
  state = {
    cart: [{id: 1, qty: 20}],
  },
  action
) => {
    switch(action.type) {
        case "ADD_TO_CART":
        return {
            ...state,
            cart: [...state.cart, action.payload],
        };
        default:
            return state;
    }
};

// store
const store = legacy_createStore(cartReducer);
console.log('oncreate :', store.getState());

// subscibe
store.subscribe(() => {
    console.log("STORE CHANGE :", store.getState());
});

// dispatch
const actionOne = { type: "ADD_TO_CART", payload: {id: 2, qty: 20}};
store.dispatch(actionOne);

