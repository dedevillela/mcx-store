import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: rgba(0,0,0,.5);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    height: calc(100vh - 40px);
    width: calc(100% - 40px);
    position: relative;

    > button {
      display: block;
      background: transparent;
      border: none;
      color: var(--highlight-color);
      font-family: monospace;
      font-weight: bold;
      position: absolute;
      top: 10px;
      right: 10px;
      text-decoration: none;

      &:hover {
        color: ${darken(0.06, '#824D3E')};
      }
    }
  }

  .product-qty {
    text-align: center;
  }

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: var(--highlight-color);
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-family: var(--support-font);
      font-weight: 700;
      text-transform: uppercase;
      transition: all 0.2s;

      &:hover {
        background: ${darken(0.06, '#824D3E')};
        color: var(--light-color);
      }
    }
  }

  @media (max-width: 768px) {
    overflow: hidden;

    footer {
      flex-direction: column-reverse;

      > button {
        width: 100%;
        margin: 20px 0;
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid var(--border-color);
  }

  img {
    height: 100px;
  }

  strong {
    color: var(--darker-color);
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid var(--light-medium-color);
      border-radius: 4px;
      color: var(--medium-color);
      padding: 6px;
      font-family: var(--support-font);
      font-weight: 700;
      text-align: center;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: var(--highlight-color);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#824D3E')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#824D3E')};
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody {
      tr {
        border-bottom: 1px solid var(--border-color);
        display: flex;
        flex-wrap: wrap;

        td {
          border-bottom: none;

          strong {
            padding: 5px 0 0;
          }

          &:last-child {
            margin: 0 0 0 auto;
          }
        }
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;
