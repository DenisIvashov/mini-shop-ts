import { Outlet, Link } from "react-router-dom";
import { useCartStore } from "./store/cartStore";

function App() {
  const { cart } = useCartStore();
  const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header>
        <Link to="/" className="logo">🛒 Мини-Магазин</Link>
        <nav>
          <Link to="/">Каталог</Link>
          <Link to="/cart">Корзина({totalItem})</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Мини-магазин</p>
      </footer>
    </>
  );
}

export default App
