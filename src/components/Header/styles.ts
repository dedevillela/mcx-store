import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  background: var(--dark-color);
  margin: 0 0 50px 0;

  h1 {
    display: none;
  }
  
  > div {
    width: 1000px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
  }

  a {
    transition: opacity 0.2s;
    display: inline-block;
    position: relative;

    &:hover {
      opacity: 0.7;
    }

    .cart-size {
      background: var(--light-color);
      color: black;
      width: 16px;
      height: 16px;
      text-align: center;
      border-radius: 8px;
      font-size: 10px;
      font-weight: bold;
      line-height: 18px;
      position: absolute;
      left: 15px;
      top: -5px;

      span {
        font-family: var(--support-font);
        font-size: 10px;
        font-weight: 700;
        margin-left: -1px;
      }
    }
  }

  @media (max-width: 1023px) {
    margin: 0;
    
    > div {
      width: 100%;
      padding: 0 20px;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
