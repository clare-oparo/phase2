// cartStore.js
import create from 'zustand';

const useStore = create((set) => ({
  cartItems: 0,
  activeUser: null,
  fetchActiveUser: async () => {
    try {
      const response = await fetch('http://localhost:3000/active-user');
      const userData = await response.json();
      set({ activeUser: userData[0].username });
    } catch (error) {
      console.log('Not logged in');
    }
    
  },
  fetchCartItems: async () => {
        try {
      const response = await fetch("http://localhost:3000/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const cartData = await response.json();
      const totalQuantity = cartData.reduce(
        (total, item) => total + item.quantity,
        0
      );
      set({ cartItems: totalQuantity });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // Handle error or set default value for cart items
      set({ cartItems: 0 });
    }
  },
  
  logout: async () => {
    try {
      await fetch('http://localhost:3000/active-user/1', {
        method: 'DELETE',
      });
      set({ activeUser: null });
      alert('Thank you for shopping with us!')
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  addToCart: async (item) => {
    try {
      const itemWithQuantity = { ...item, quantity: 1 };
      const totalPrice = item.price * itemWithQuantity.quantity;
      const itemWithTotal = { ...itemWithQuantity, total: totalPrice };
  
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemWithTotal),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      alert('Item added to cart');
      set((state) => ({ cartItems: state.cartItems + 1 }));
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Item already in cart');
    }
    
  },
}));

export default useStore;
