import { createContext, useContext } from "react";
import type { Product } from "../types";


//TypeScript проверяет: «Ага, ты добавляешь в корзину объект. Он точно имеет все поля Product плюс quantity? Если чего-то не хватает — ошибка».
export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
}

export const CartContext = createContext<CartContextType | null>(null);



export function useCart() {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error('useCart must be used within CartContext.Provider');
    }
    return context;
}