import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function getCartKey(product) {
  return product.size ? `${product.id}-${product.size}` : String(product.id);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("latasha-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Unable to load cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("latasha-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  // Add product to cart (optionally with a quantity and size)
  const addToCart = (product, options = {}) => {
    const quantity = options.quantity ?? 1;
    const size = options.size ?? product.size ?? null;

    setCartItems((currentItems) => {
      const incoming = { ...product, size };
      const incomingKey = getCartKey(incoming);

      const existingItem = currentItems.find(
        (item) => getCartKey(item) === incomingKey
      );

      if (existingItem) {
        return currentItems.map((item) =>
          getCartKey(item) === incomingKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...incoming, quantity }];
    });
  };

  // Remove product line completely
  const removeFromCart = (productId, size = null) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => {
        if (size) {
          return !(item.id === productId && item.size === size);
        }

        return item.id !== productId;
      })
    );
  };

  // Increase quantity
  const increaseQuantity = (productId, size = null) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && (size === null || item.size === size)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId, size = null) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId && (size === null || item.size === size)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove everything
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of products
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.salePrice ?? item.price;

    return total + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}