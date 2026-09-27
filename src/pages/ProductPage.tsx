import products from "../data/products";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function ProductPage() {
    const { addToCart } = useCartStore();
    const { id } = useParams();
    const product = products.find(b => b.id === Number(id));

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
        <button onClick={() => addToCart(product)}>В корзину</button>
      </>
    );
    
}

export default ProductPage;