import React, { useEffect, useState } from "react";
import PopularProductCard from "../../../components/PopularProductCard";
import { axios, STORAGE_URL } from "../../../api";

function PopularProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products", { params: { per_page: 3 } })
      .then((res) => {
        const data = res.data.products?.data || [];
        setProducts(data.slice(0, 3));
      })
      .catch(() => setProducts([]));
  }, []);

  const displayProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    image: `${STORAGE_URL}/${p.image}`,
    short_description: p.short_description || p.description || "",
  }));

  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">
          {displayProducts.map((product) => (
            <PopularProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
