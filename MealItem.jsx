import { useContext } from 'react';
import './MealItem.css';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);
    
    function handleAddMealToCart() {
        console.log('Adding to cart:', meal);
        cartCtx.addItem(meal);
        console.log('Cart after adding:', cartCtx.items);
    }
    
    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <div className="price-tag">
                        <span className="price-value">
                            {currencyFormatter.format(meal.price)}
                        </span>
                    </div>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to cart</Button>
                </p>
            </article>
        </li>
    );
}