import styled from 'styled-components';

export const Container = styled.div`
  width: 1000px;
  margin: 0 auto;

  h2 {
    font-size: 26px;
    font-weight: 400;
    letter-spacing: .1em;
    margin: 0 0 20px;
    text-align: center;
    text-transform: uppercase;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;
