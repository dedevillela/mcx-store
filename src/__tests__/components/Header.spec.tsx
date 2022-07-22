import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import Header from '../../components/Header';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('../../hooks/useCart', () => {
  return {
    useCart: () => ({
      cart: [
        {
          amount: 2,
          id: 1,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
        {
          amount: 1,
          id: 2,
          image: './images/products/regata.jpg',
          price: 759,
          title: 'Regata Feminina de Tricot com Ombreira',
        },
      ],
    }),
  };
});

describe('Header Component', () => {
  it('should be able to render the amount of products added to cart', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter).toHaveTextContent('2');
  });
});
