import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@MCXStoreApp:cart');

    if (storagedCart) {
      // Parse a string into an array, as it is expected in <Product[]> state
      return JSON.parse(storagedCart);
    }

    return [];
  });
  // Keeps a reference from array of products
  const prevCartRef = useRef<Product[]>();
  // Checks previos cart value
  useEffect(() => {
    prevCartRef.current = cart;
  });
  // If different from 'null or 'undefined', set cart value
  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    // If previous cart value is different from current cart value, cart must be updated
    if (cartPreviousValue !== cart) {
      // Stores cart data in localStorage
      localStorage.setItem('@MCXStoreApp:cart', JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      // Array with all cart values and/or updates
      const updatedCart = [...cart];
      // Variable which checks if product exists on cart
      const productExists = updatedCart.find(product => product.id === productId);
      // Get stock from API
      const stock = await api.get(`/stock/${productId}`);
      // Variable with stock amount
      const stockAmount = stock.data.amount;
      // Variable which checks the amount of products on cart
      const curentAmount = productExists ? productExists.amount : 0;
      // Variable with current amount of products
      const amount = curentAmount + 1;
      // Condition which checks if the amount of products isn't bigger than the current amount
      if (amount > stockAmount) {
        // Shows message error for out of stock
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }
      // Condition which checks if the product exists
      if (productExists) {
        // Updates the amount of products on cart
        productExists.amount = amount;
      } else {
        // Add new product to cart
        const product = await api.get(`/products/${productId}`);
        // Add amount equal to one to cart
        const newProduct = {
          ...product.data,
          amount: 1
        }
        // Updates cart with new product
        updatedCart.push(newProduct);
      }
      // Update the cart
      setCart(updatedCart);
    } catch {
      // Shows message error for adding a product to cart
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // Array with cart contents
      const updatedCart = [...cart];
      // Choose findIndex to use splice to remove product from cart
      const productIndex = updatedCart.findIndex(product => product.id === productId);
      // If found product...
      if (productIndex >= 0) {
        // Remove a product from array
        updatedCart.splice(productIndex, 1);
        // Updates cart contents
        setCart(updatedCart);
      } else {
        // Forces error and proceeds to catch
        throw Error();
      }
    } catch {
      // Error message while removing product from cart
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // Checks if amount is greater than zero, otherwise leaves
      if (amount <= 0) {
        return;
      }
      // Variable with product stock
      const stock = await api.get(`/stock/${productId}`);
      // Variable with product amount in stock
      const stockAmount = stock.data.amount;
      // Checks if amount is greater than stock
      if (amount > stockAmount) {
        // Error message with out of stock amount
        toast.error('Quantidade solicitada fora de estoque');
        // Stop running
        return;
      }
      // Variable with cart arry (keeping immutability)
      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);
      // Checks if product exists
      if (productExists) {
        productExists.amount = amount;
        // Updates cart contents
        setCart(updatedCart);
      } else {
        // Forces error and proceeds to catch
        throw Error();
      }
    } catch {
      // Error message while trying to update product amount
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
