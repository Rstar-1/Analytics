import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        const price =
            typeof product.price === 'string'
                ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
                : Number(product.price) || 0;

        setCartItems((prev) => {
            const exists = prev.some(
                (item) => item.id === product.id || item.name === product.name
            );

            if (exists) {
                return prev.map((item) =>
                    item.id === product.id || item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: product.id || Date.now(),
                    name: product.name,
                    category: product.category || 'Standard',
                    price,
                    quantity: 1,
                    image: product.image || ''
                }
            ];
        });

        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        const qty = Math.max(1, Number(quantity) || 1);

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const cartQty = cartItems.reduce((total, item) => total + item.quantity, 0);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartQty,
                subtotal,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                setExactQuantity: updateQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);