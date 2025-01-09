import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log('Action Payload:', action.payload); // Debugging
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i._id === item._id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItems.push({ ...item, quantity: item.quantity || 1 });
            }
            console.log('Updated Cart Items:', state.cartItems); // Debugging
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((i) => i._id === id);
            if (item) item.quantity = quantity;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
