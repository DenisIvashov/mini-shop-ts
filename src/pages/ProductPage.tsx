import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useEffect, useState } from "react";
import type { Product } from "../types";

function ProductPage() {
    const { addToCart } = useCartStore();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null)
    
    useEffect(() => {
      fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then((data) => setProduct(data))
    }, [id])

    if (!product) {
      return <h2>Товар не найден</h2>;
    } 

    return (
      <>
        <div>
          <img src={product.images[0]} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
        <Link to="/">
            <button>Назад</button>
        </Link>
        <button onClick={() => addToCart(product)}>В корзину</button>
      </>
    );
    
}

export default ProductPage;