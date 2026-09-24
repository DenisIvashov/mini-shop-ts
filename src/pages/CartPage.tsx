import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate();
    const { cart, setCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalFixed = total.toFixed(2);

    function removeFromCart(id: number) {
        const updated = cart.filter(item => item.id !== id);
        setCart(updated);
    }
    
    if (cart.length === 0) {
        return <h2>Корзина пуста</h2>
    }

    function changeQuantity(id: number, delta: number) {
        const updated = cart.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity < 1) return item;
                return { ...item, quantity: newQuantity}
            }
            return item;
        });
        setCart(updated);
    }

    return (
        <>
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>{item.price}</p>
                    <p>Количество: {item.quantity}</p>
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, +1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)}>Удалить</button>
                </div>
            ))}
            <p>Итого: {totalFixed}</p>
            <button onClick={() => {
                setCart([]);
                navigate('/success')
            }}>Оформить заказ</button>
        </>
    )
}

export default CartPage;