import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useCart, CartProvider } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);

jest.mock('react-toastify');

const mockedToastError = toast.error as jest.Mock;
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
  {
    id: 1,
    amount: 2,
    image: './images/products/macacao.jpg',
    price: 759,
    title: 'Macacão Feminino Maria Filó Sobreposição',
  },
  {
    id: 2,
    amount: 1,
    image: './images/products/regata.jpg',
    price: 759,
    title: 'Regata Feminina de Tricot com Ombreira',
  },
];

describe('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
        {
          id: 2,
          amount: 1,
          image: './images/products/regata.jpg',
          price: 759,
          title: 'Regata Feminina de Tricot com Ombreira',
        },
      ])
    );
  });

  it('should be able to add a new product', async () => {
    const productId = 3;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 3,
      amount: 2,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 3,
      title: 'Blusa Feminia Silk Merci',
      price: 759,
      image: './images/products/blusa.jpg',
    });

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
        {
          id: 2,
          amount: 1,
          image: './images/products/regata.jpg',
          price: 759,
          title: 'Regata Feminina de Tricot com Ombreira',
        },
        {
          id: 3,
          amount: 1,
          image: './images/products/blusa.jpg',
          price: 759,
          title: 'Blusa Feminia Silk Merci',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@MCXStoreApp:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able add a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);
    apiMock.onGet(`products/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto'
        );
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to increase a product amount when adding a product that already exists on cart', async () => {
    const productId = 1;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 1,
      amount: 3,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 1,
      image: './images/products/macacao.jpg',
      price: 759,
      title: 'Macacão Feminino Maria Filó Sobreposição',
    });

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 3,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
        {
          id: 2,
          amount: 1,
          image: './images/products/regata.jpg',
          price: 759,
          title: 'Regata Feminina de Tricot com Ombreira',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@MCXStoreApp:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to increase a product amount when running out of stock', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 2,
      title: "Regata Feminina de Tricot com Ombreira",
      price: 759,
      image: "./images/products/regata.jpg"
    });

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        );
      },
      {
        timeout: 200,
      }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to remove a product', () => {
    const productId = 2;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@MCXStoreApp:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to remove a product that does not exist', () => {
    const productId = 3;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should be able to update a product amount', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 5,
    });

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 2, productId });
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          amount: 2,
          image: './images/products/macacao.jpg',
          price: 759,
          title: 'Macacão Feminino Maria Filó Sobreposição',
        },
        {
          id: 2,
          amount: 2,
          image: './images/products/regata.jpg',
          price: 759,
          title: 'Regata Feminina de Tricot com Ombreira',
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@MCXStoreApp:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able to update a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 3, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto'
        );
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should not be able to update a product amount when running out of stock', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1,
    });

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 2, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        );
      },
      { timeout: 200 }
    );

    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should not be able to update a product amount to a value smaller than 1', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 2,
      amount: 1,
    });

    const { result, waitForValueToChange } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 0, productId });
    });

    try {
      await waitForValueToChange(
        () => {
          return result.current.cart;
        },
        { timeout: 50 }
      );
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    } catch {
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    }
  });
});
