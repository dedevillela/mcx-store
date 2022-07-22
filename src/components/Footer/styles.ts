import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.footer`
  background: var(--light-color);
  font-family: var(--support-font);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin: 40px 0 0;

  .copyright {
    a {
      color: var(--highlight-color);
      font-weight: 700;
      transition: all 0.2s;

      &:hover {
        color: ${darken(0.06, '#824D3E')};
      }
    }
  }
  
  .separator {
    padding: 0.5em;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .separator {
      display: none;
    }

    span {
      display: block;
    }
  }
`;