import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity += action.payload.quantity;
                state.total += action.payload.price * action.payload.quantity;
            } else {
                state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
                state.quantity += 1;
            }
            
        },
        removeProduct: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                const productToRemove = state.products[index];
                if (productToRemove.quantity > 1) {
                    productToRemove.quantity -= 1;
                    state.total -= productToRemove.price;
                } else {
                    state.products.splice(index, 1);
                    state.quantity -= 1;
                    state.total -= productToRemove.price;
                }
            }
        },
    },
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;