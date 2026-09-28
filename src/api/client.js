const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiRequest(path, options = {}, didRefresh = false) {
  const token = localStorage.getItem("latasha-access-token");
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (response.status === 401 && !didRefresh && !path.startsWith("/auth/token/refresh/")) {
    const refresh = localStorage.getItem("latasha-refresh-token");
    if (refresh) {
      try {
        const tokens = await apiRequest("/auth/token/refresh/", { method: "POST", body: JSON.stringify({ refresh }) }, true);
        localStorage.setItem("latasha-access-token", tokens.access);
        if (tokens.refresh) localStorage.setItem("latasha-refresh-token", tokens.refresh);
        return apiRequest(path, options, true);
      } catch {
        localStorage.removeItem("latasha-access-token");
        localStorage.removeItem("latasha-refresh-token");
      }
    }
  }
  const data = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.detail || Object.values(data || {}).flat().join(" ") || "The request could not be completed.";
    throw new Error(message);
  }
  return data;
}

export const api = {
  categories: () => apiRequest("/products/categories/"),
  products: (query = "") => apiRequest(`/products/products/${query}`),
  cart: () => apiRequest("/cart/"),
  addCartItem: (item) => apiRequest("/cart/items/", { method: "POST", body: JSON.stringify(item) }),
  updateCartItem: (id, quantity) => apiRequest(`/cart/items/${id}/`, { method: "PATCH", body: JSON.stringify({ quantity }) }),
  removeCartItem: (id) => apiRequest(`/cart/items/${id}/`, { method: "DELETE" }),
  clearCart: () => apiRequest("/cart/clear/", { method: "DELETE" }),
  checkout: (payload) => apiRequest("/checkout/", { method: "POST", body: JSON.stringify(payload) }),
  subscribe: (email) => apiRequest("/newsletter/", { method: "POST", body: JSON.stringify({ email }) }),
  login: (credentials) => apiRequest("/auth/login/", { method: "POST", body: JSON.stringify(credentials) }),
  register: (details) => apiRequest("/auth/register/", { method: "POST", body: JSON.stringify(details) }),
  refreshToken: (refresh) => apiRequest("/auth/token/refresh/", { method: "POST", body: JSON.stringify({ refresh }) }),
  logout: (refresh) => apiRequest("/auth/logout/", { method: "POST", body: JSON.stringify({ refresh }) }),
  account: (details) => apiRequest("/auth/me/", details ? { method: "PATCH", body: JSON.stringify(details) } : {}),
  wishlist: () => apiRequest("/wishlist/"),
  addWishlistItem: (product) => apiRequest("/wishlist/", { method: "POST", body: JSON.stringify({ product }) }),
  removeWishlistItem: (id) => apiRequest(`/wishlist/${id}/`, { method: "DELETE" }),
  removeWishlistProduct: (productId) => apiRequest(`/wishlist/product/${productId}/`, { method: "DELETE" }),
  orders: () => apiRequest("/orders/"),
  order: (number) => apiRequest(`/orders/${number}/`),
  cancelOrder: (number) => apiRequest(`/orders/${number}/cancel/`, { method: "POST", body: JSON.stringify({}) }),
  coupons: () => apiRequest("/coupons/"),
  validateCoupon: (code, subtotal) => apiRequest("/coupons/validate/", { method: "POST", body: JSON.stringify({ code, subtotal }) }),
  createPayment: (orderNumber, idempotencyKey) => apiRequest(`/orders/${orderNumber}/payments/`, { method: "POST", headers: { "Idempotency-Key": idempotencyKey }, body: JSON.stringify({}) }),
  reviews: (productId) => apiRequest(`/reviews/${productId ? `?product=${productId}` : ""}`),
  createReview: (review) => apiRequest("/reviews/", { method: "POST", body: JSON.stringify(review) }),
  updateReview: (id, review) => apiRequest(`/reviews/${id}/`, { method: "PATCH", body: JSON.stringify(review) }),
  deleteReview: (id) => apiRequest(`/reviews/${id}/`, { method: "DELETE" }),
  notifications: () => apiRequest("/notifications/"),
  unreadNotificationCount: () => apiRequest("/notifications/unread_count/"),
  markNotificationRead: (id) => apiRequest(`/notifications/${id}/read/`, { method: "POST", body: JSON.stringify({}) }),
  markAllNotificationsRead: () => apiRequest("/notifications/read-all/", { method: "POST", body: JSON.stringify({}) }),
};

export function normalizeProduct(product) {
  const images = (product.images || []).map((image) => image.image_url || image.image).filter(Boolean);
  return {
    ...product,
    categoryName: product.category?.name || "",
    category: product.category?.name || "",
    categorySlug: product.category?.slug || "",
    price: Number(product.price),
    salePrice: product.sale_price ? Number(product.sale_price) : null,
    effectivePrice: Number(product.effective_price || product.sale_price || product.price),
    rating: Number(product.rating || 0),
    reviews: product.review_count || 0,
    isNew: product.is_new,
    isFeatured: product.is_featured,
    images,
    image: images[0] || "",
    details: (product.details || []).map((detail) => detail.text),
    sizes: (product.available_sizes || []).map((variant) => variant.size.name),
    sizeOptions: product.available_sizes || [],
  };
}
