import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

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

  useEffect(() => {
    api.cart().then((cart) => {
      const remoteItems = (cart.items || []).map((item) => ({
        id: item.product,
        cartItemId: item.id,
        name: item.product_name,
        image: item.product_image || "",
        price: Number(item.unit_price),
        salePrice: null,
        quantity: item.quantity,
        size: item.size_name || null,
        sizeId: item.size,
      }));
      setCartItems((current) => current.length ? current : remoteItems);
    }).catch((error) => console.warn("Cart API is unavailable:", error.message));
  }, []);

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
    const size = options.size ?? product.size ?? product.sizeOptions?.[0]?.size.name ?? null;
    const sizeVariant = product.sizeOptions?.find((variant) => variant.size.name === size);
    api.addCartItem({ product: product.id, size: sizeVariant?.size.id ?? null, quantity })
      .then((cart) => {
        const serverItem = cart.items.find((item) => item.product === product.id && item.size === (sizeVariant?.size.id ?? null));
        if (serverItem) setCartItems((items) => items.map((item) => item.id === product.id && item.size === size ? { ...item, cartItemId: serverItem.id, price: Number(serverItem.unit_price), image: serverItem.product_image || item.image } : item));
      })
      .catch((error) => console.warn("Unable to sync cart:", error.message));

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
    const matches = cartItems.filter((item) => item.id === productId && (size === null || item.size === size));
    matches.forEach((item) => { if (item.cartItemId) api.removeCartItem(item.cartItemId).catch((error) => console.warn("Unable to update cart:", error.message)); });
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
    const existing = cartItems.find((item) => item.id === productId && (size === null || item.size === size));
    if (existing?.cartItemId) api.updateCartItem(existing.cartItemId, existing.quantity + 1).catch((error) => console.warn("Unable to update cart:", error.message));
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
    const existing = cartItems.find((item) => item.id === productId && (size === null || item.size === size));
    if (existing?.cartItemId) {
      if (existing.quantity <= 1) api.removeCartItem(existing.cartItemId).catch((error) => console.warn("Unable to update cart:", error.message));
      else api.updateCartItem(existing.cartItemId, existing.quantity - 1).catch((error) => console.warn("Unable to update cart:", error.message));
    }
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
    api.clearCart().catch((error) => console.warn("Unable to clear server cart:", error.message));
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
