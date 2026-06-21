import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading };
};
