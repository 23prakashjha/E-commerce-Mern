import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      const { data } = await api.get("/cart");
      setItems(data || []);
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const add = useCallback(async (productId, quantity = 1) => {
    const { data } = await api.post("/cart", { productId, quantity });
    setItems(data);
  }, []);

  const update = useCallback(async (productId, quantity) => {
    if (quantity < 1) return;
    await api.put("/cart", { productId, quantity });
    setItems((prev) => prev.map((i) => i.product._id === productId ? { ...i, quantity } : i));
  }, []);

  const remove = useCallback(async (productId) => {
    await api.delete(`/cart/${productId}`);
    setItems((prev) => prev.filter((i) => i.product._id !== productId));
  }, []);

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return { items, loading, add, update, remove, subtotal, tax, total, refetch: fetch };
};
