import { create } from 'zustand';
import type { Product } from '../types';

export interface CartItem extends Product {
    quantity: number;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    changeQuantity: (id: number, delta: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],

    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        return {
            cart: [...state.cart, { ...product, quantity: 1 }],
        };
    }),

    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id),
    })),

    changeQuantity: (id, delta) => set((state) => ({
        cart: state.cart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity < 1) return item;
                return { ...item, quantity: newQuantity };
            }
            return item;
        }),
    })),

    clearCart: () => set({ cart: [] }),
}));