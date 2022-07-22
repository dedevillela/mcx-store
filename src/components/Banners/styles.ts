import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 50px 0;

  > div {
    width: 1000px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }

  @media (max-width: 1023px) {
    > div {
      width: 100%;
      padding: 0 20px;
    }
  }
`;

export const BannerList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  list-style: none;
  width: 1000px;
  margin: 0 auto;
  min-height: 237px;

  li {
    img {
      border-radius: 2px;
      max-width: 490px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: var(--dark-color);
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0;
    }

    .price-installment {
      font-size: 12px;
      line-height: 16.37px;
      letter-spacing: 10%;
      font-weight: bold;
      color: var(--light-text-color);
      margin: 0 0 25px;
    }

    button {
      background: var(--highlight-color);
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      padding: 12px 0;

      display: flex;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        background: ${darken(0.06, '#824D3E')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }

      .cart-product-quantity {
        display: none;
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 20px;
    width: 100%;

    li {
      img {
        max-width: 100%;
      }
    }
  }
`;