import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export  default function Cart() {
   const cartCtx = useContext(CartContext);
   const UserProgressCtx = useContext(UserProgressContext);

   const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
     0);

   function handleClose() {
    UserProgressCtx.hideCart();
   }
   function handleGoToCheckout() {
    UserProgressCtx.showCheckout();
  }

    return(
        <Modal className="cart" open={UserProgressCtx.progress === 'cart'}>
         <h2>Your Cart</h2>
         <ul>
          {cartCtx.items.map((item) => (
             <CartItem key={item.id}
             name={item.name}
             quantity={item.quantity}
             price={item.price}
             onIncrease={() => cartCtx.addItem(item)}
             onDecrease={() => cartCtx.removeItem(item.id)}
             />
          ))}
         </ul>
         <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
         <p className="modal-actions">
            <Button textOnly onClick={handleClose}>Close</Button>
           {cartCtx.items.length > 0 && ( 
            <Button onClick={handleGoToCheckout}>
              Go to checkout
              </Button> 
            ) }
         </p>

        </Modal>
    );
}