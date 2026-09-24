import products from "../data/products";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

function ProductPage() {
    const { cart, setCart } = useCart();
    const { id } = useParams();
    const product = products.find(b => b.id === Number(id));

    function addCart(product: Product) {
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        const updated = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        setCart(updated);
      } else {
        setCart([
          ...cart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1,
          },
        ]);
      }
      console.log('Корзина:', cart);
    }
   
    if (!product) {
      return <h2>Товар не найден</h2>;
    } 

    return (
      <>
        <div>
          <img src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
        <Link to="/">
            <button>Назад</button>
        </Link>
        <button onClick={() => addCart(product)}>В корзину</button>
      </>
    );
    
}

export default ProductPage;