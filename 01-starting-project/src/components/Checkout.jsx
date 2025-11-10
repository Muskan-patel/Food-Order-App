import { useContext, useEffect } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";

// Add Error component if missing
function Error({ title, message }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

const requestConfig = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  }
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data,
     isLoading: isSending,
      error, 
      sendRequest
    } = useHttp(
    'http://localhost:3000/orders',
    requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
     
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());


    sendRequest(
      JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
      })
    );
  }
  // useEffect(() => {
  //   if (data && !isSending && !error) {
  //     // Add console log to debug
  //     console.log("Order successful, showing success modal");
  //     userProgressCtx.showOrderSuccess();
  //   }
  // }, [data, isSending, error, userProgressCtx]);

  // // Add console log to help debug state
  // console.log("Current progress:", userProgressCtx.progress);
  // console.log("Has data:", !!data);
  // console.log("Is sending:", isSending);
  // console.log("Has error:", !!error);

   let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
   );


   if(isSending) {
    actions = <span>Sending data ....</span>;
   }

  // if (isSending) {
  //   return (
  //     <Modal open={true} onClose={handleClose}>
  //       <p>Sending order data...</p>
  //     </Modal>
  //   );
  // }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} 
       onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We'll get back to you with more details via email within the next few minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" required />
        <Input label="Phone No." type="text" id="phone-no" required />
        <Input label="Email Address" type="email" id="email" required />
        <Input label="Street" type="text" id="street" required />
        <div className="control-row">
          <Input label="City" type="text" id="city" required />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">
         {actions}
        </p>
      </form>
    </Modal>
  );
}