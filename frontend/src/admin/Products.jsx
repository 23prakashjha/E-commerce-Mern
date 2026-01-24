import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Trash2, Edit, Plus, Search, Package, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:5000";

const emptyProduct = {
  name: "",
  price: "",
  category: "Mens",
  description: "",
  images: [],
  imagePreviews: [],
};

const categories = [
  "Mens",
  "Womens",
  "Children",
  "Accessories",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [fullImage, setFullImage] = useState(null); // For full-size image modal

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  /* ================= ADD PRODUCT ================= */
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.images.length) {
      return toast.error("Please upload at least one image");
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      newProduct.images.forEach((img) => formData.append("images", img));

      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) => [...prev, res.data]);
      toast.success("Product added");

      newProduct.imagePreviews.forEach(URL.revokeObjectURL);
      setNewProduct(emptyProduct);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= FILTER PRODUCTS ================= */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [products, search, categoryFilter]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="text-orange-500" />
            Products
          </h1>
          <p className="text-gray-500 mt-1">Manage your store inventory efficiently</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-orange-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl px-4 py-2 w-full sm:w-48"
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredProducts.map((p) => (
    <motion.div
      key={p._id}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col"
    >
      {/* IMAGES */}
      <div className="flex overflow-x-auto gap-3 p-3 bg-gray-50 cursor-pointer scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {p.images.map((img, i) => (
          <img
            key={i}
            src={`${API_URL}/${img}`}
            alt={p.name}
            className="h-75 w-65 min-w-8rem object-cover rounded-xl hover:scale-110 transition-transform duration-300"
            onClick={() => setFullImage(`${API_URL}/${img}`)}
          />
        ))}
      </div>

      {/* INFO */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg md:text-xl truncate">{p.name}</h2>
          <p className="text-orange-500 font-bold mt-1 text-lg md:text-xl">₹{p.price}</p>
          <p className="text-gray-500 mt-1 text-sm md:text-base">{p.category}</p>
          {p.description && (
            <p className="text-gray-600 mt-2 text-sm md:text-base line-clamp-3">
              {p.description}
            </p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-4">
          <button
            className="flex items-center justify-center text-blue-500 hover:text-white bg-blue-100 hover:bg-blue-500 p-2 rounded-lg transition-all"
            aria-label={`Edit ${p.name}`}
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => deleteProduct(p._id)}
            className="flex items-center justify-center text-red-500 hover:text-white bg-red-100 hover:bg-red-500 p-2 rounded-lg transition-all"
            aria-label={`Delete ${p.name}`}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  ))}
</div>



      {/* ADD PRODUCT MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4">Add New Product</h2>

              <form onSubmit={addProduct} className="space-y-4">
                <input
                  placeholder="Product name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                />

                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Product description"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  rows={4}
                />

                {/* IMAGE UPLOAD */}
                <label className="flex flex-col items-center gap-2 cursor-pointer border border-dashed p-3 rounded-lg hover:bg-orange-50 transition">
                  <Upload className="text-orange-500 w-6 h-6" />
                  <span className="text-gray-500">
                    {newProduct.imagePreviews.length > 0
                      ? `${newProduct.imagePreviews.length} image(s) selected`
                      : "Upload product images"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const previews = files.map((file) => URL.createObjectURL(file));
                      setNewProduct({
                        ...newProduct,
                        images: files,
                        imagePreviews: previews,
                      });
                    }}
                  />
                </label>

                {/* PREVIEWS */}
                {newProduct.imagePreviews.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto mt-2">
                    {newProduct.imagePreviews.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Preview ${idx}`}
                        className="h-50 w-50 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL IMAGE MODAL */}
      <AnimatePresence>
        {fullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setFullImage(null)}
          >
            <motion.img
              src={fullImage}
              alt="Full size"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-h-full max-w-full rounded-xl shadow-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
