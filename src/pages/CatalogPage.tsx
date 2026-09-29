import type { Product } from "../types";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";

function CatalogPage() {
  const { addToCart } = useCartStore();
  const [search, setSearch] = useState('');
  const [api, setApi] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(api.map(p => p.category))];

  useEffect(() => {
    fetch('/api/products')
        .then((response) => response.json())
        .then((data) => setApi(data.products)) // <-- вот здесь
        .catch((error) => console.error('Ошибка загрузки:', error));
}, []);

  const filtered = api
    .filter(product => category === 'all' || product.category === category)
    .filter(product => product.title.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );
  
  return (
    <>
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск товаров..."
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "Все категории" : cat}
          </option>
        ))}
      </select>
      
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      <div className="catalog">
        {sorted.map((product: Product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image-wrapper">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200";
                  }}
                />
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