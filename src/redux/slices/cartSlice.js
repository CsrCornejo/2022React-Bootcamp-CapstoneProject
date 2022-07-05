import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        add: (state, action) => {
            const { product: { id: newId }, amount } = action.payload;
            const foundIndex = state.cart.findIndex(({ id }) => id === newId);
            if (foundIndex !== -1) {
                const { product: { data: { stock }}, amount: foundAmount } = state.cart[foundIndex];
                const calculatedAmount = parseInt(foundAmount) + parseInt(amount)
                if (stock >= calculatedAmount) {
                    state.cart[foundIndex].amount = calculatedAmount;
                }
            } else {
                state.cart.push({ ...action.payload, id: newId });
            }
        },
        del: (state, action) => {
            state.cart = state.cart.filter(({ id }) => id !== action.payload);
        },
        changeAmount: (state, action) => {
            const { id: newId, amount } = action.payload;
            const foundIndex = state.cart.findIndex(({ id }) => id === newId);
            if (foundIndex !== -1) {
                const { product: { data: { stock }}} = state.cart[foundIndex];
                if (stock >= amount) {
                    state.cart[foundIndex].amount = parseInt(amount);
                }
            }
        },
    },
})

export const { add, del, changeAmount } = cartSlice.actions

export default cartSlice.reducer