import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axios } from "../../../api";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    axios
      .get("/category")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (String(id) === activeCategory) {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    params.delete("page");
    navigate(`/shop?${params.toString()}`);
  };

  const handleAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("page");
    navigate(`/shop?${params.toString()}`);
  };

  if (categories.length === 0) return null;

  return (
    <div className="container pt-4">
      <div className="d-flex flex-wrap gap-2 align-items-center">
        <span className="text-muted me-2 small fw-bold text-uppercase">Filter:</span>
        <button
          className={`btn btn-sm ${!activeCategory ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={handleAll}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`btn btn-sm ${String(cat.id) === activeCategory ? "btn-dark" : "btn-outline-secondary"}`}
            onClick={() => handleSelect(cat.id)}
          >
            {cat.nameCategory || cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
