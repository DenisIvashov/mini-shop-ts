import { Link } from "react-router-dom";

function SuccessPage() {
    return (
        <div>
            <h1>Спасибо за заказ</h1>
            <Link to="/">Вернуться в каталог</Link>
        </div>
    )
}

export default SuccessPage;