import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
min-width: 1000px;
min-height: 480px;
position: relative;
margin: 0 auto;

button {
  &.prod_prev,
  &.prod_next {
    background: var(--dark-color);
    border: none;
    color: #fff;
    line-height: 10px;
    position: absolute;
    width: 40px;
    height: 53px;
    top: 175px;

    &:hover {
      background: ${darken(0.06, '#444444')};
    }
  }

  &.prod_prev {
    left: -60px;
  }

  &.prod_next {
    right: -60px;
  }
}

.mySwiper {
  width: 1000px;
  margin: 0 auto;

  .swiper-pagination {
    display: none;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    border: 1px solid var(--border-color);

    img {
      align-self: center;
      max-width: 193px;
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
      margin: 0 0 12px;
    }

    button {
      background: var(--highlight-color);
      color: #fff;
      border: 0;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 13px;
      padding: 12px 0;
      opacity: 0;

      display: none;
      transition: all 0.5s;

      &:hover {
        background: ${darken(0.06, '#824D3E')};
        color: var(--light-color);
      }

      .cart-product-quantity {
        display: none;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }

      span {
        flex: 1;
        text-align: center;
        font-family: var(--support-font);
        font-weight: bold;
        letter-spacing: .1em;
      }
    }

    .cart-product-favorite {
      position: absolute;
      top: 10px;
      right: 10px;
      color: var(--favorite-color);
      cursor: pointer;
    }

    .cart-product-label {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    &:hover {
      button {
        display: block;
        opacity: 1;
      }
    }
  }
}

@media (max-width: 767px) {
  min-width: unset;

  button {
    &.prod_prev,
    &.prod_next {
      display: none;
    }
  }

  .mySwiper {
    width: calc(100vw - 40px);
    min-height: 450px;

    .swiper-slide {
      img {
        max-width: calc(50vw - 30px);
      }

      &:hover {
        button {
          display: none;
        }
      }
    }

    .swiper-pagination {
      display: block;

      .swiper-pagination-bullet {
        background: var(--medium-color);
        width: 16px;
        height: 16px;
      }
    }
  }
}
`;