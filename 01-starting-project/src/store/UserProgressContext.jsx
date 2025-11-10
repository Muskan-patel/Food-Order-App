import { createContext, useState } from "react";

const UserProgressContext  = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export function UserProgressContextProvider({children}) {
    const [UserProgress, setUserProgress] = useState();

    function showCart() {
        setUserProgress('cart');
    }

    function hideCart() {
        setUserProgress('');
    }

    function showCheckout() {
        setUserProgress('checkout');
    }

    function hideCheckout() {
        setUserProgress('');
    }

    const UserProgressCtx = {
      progress: UserProgress,
      showCart,
      hideCart,
      showCheckout,
      hideCheckout
    };

    return (
        <UserProgressContext.Provider  value={UserProgressCtx}> 
        {children} 
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;