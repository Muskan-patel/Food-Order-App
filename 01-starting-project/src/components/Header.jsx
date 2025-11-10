import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import "./Header.css";

export default function Header() {
   const cartCtx = useContext(CartContext);
   const UserProgressCtx = useContext(UserProgressContext);
   const totalItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
   }, 0);

   function handleShowCart() {
      UserProgressCtx.showCart();
   }

    return(
       <header id="main-header">
        <div id="title"> 
            <img src={logoImg} alt="Foodie Logo"/>
            <h1>Foodie</h1>
        </div>
        <nav id="main-nav">
            <ul className="nav-links">
                <li><a href="#" className="nav-link active">Home</a></li>
                <li><a href="#" className="nav-link">Menu</a></li>
                <li><a href="#" className="nav-link">About Us</a></li>
                <li><a href="#" className="nav-link">Contact</a></li>
            </ul>
            <Button textOnly className="glow-button" onClick={handleShowCart}>Order ({totalItems})</Button>
        </nav>
       </header>
    );
}