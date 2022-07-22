import { Link } from 'react-router-dom';

import logoMCX from '../../assets/images/logo-mcx.png';
import iconShoppingCart from '../../assets/images/icon-shopping-cart.svg';
import { Container, Cart } from './styles';
import { useCart } from '../../hooks/useCart';

export default function Header () {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <div>
        <Link to="/">
          <h1>Online Store using React and Typescript</h1>
          <img src={logoMCX} alt="MCX Store" title="MCX Store" loading="eager" width={117} height={36} />
        </Link>

        <Cart to="/cart">
          <div className="cart-size">
            <span data-testid="cart-size">
              {cartSize}
            </span>
          </div>
          <img src={iconShoppingCart} alt="Shopping Cart" title="Shopping Cart" loading="eager" width={24} height={24} />
        </Cart>
      </div>
    </Container>
  );
};
