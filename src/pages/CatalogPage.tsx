import products from "../data/products";
import type { Product } from "../types";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";

function CatalogPage() {
  const { addToCart } = useCartStore();
  const [search, setSearch] = useState('');

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <>
      <input className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск товаров..."
    />
      <div className="catalog">
        {filtered.map((product: Product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <div className="product-info">
              <p className="product-price">{product.price} $</p>
              <button onClick={() => addToCart(product)}>В корзину</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CatalogPage;