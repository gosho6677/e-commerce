import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemsReducer from '../features/items/itemsSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    items: itemsReducer,
    cart: cartReducer,
  }
});
