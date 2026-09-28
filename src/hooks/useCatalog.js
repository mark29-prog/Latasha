import { useEffect, useState } from "react";
import { api, normalizeProduct } from "../api/client";

export default function useCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    Promise.all([api.products(), api.categories()])
      .then(([productData, categoryData]) => {
        if (!active) return;
        setProducts((productData.results || productData).map(normalizeProduct));
        setCategories(categoryData.results || categoryData);
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { products, categories, loading, error };
}
