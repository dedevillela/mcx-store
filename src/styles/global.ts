import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  :root {
    --base-color:         #191920;
    --highlight-color:    #824D3E;
    --dark-color:         #444444;
    --darker-color:       #333333;
    --darkest-color:      #000000;
    --border-color:       #EEEEEE;
    --light-medium-color: #DDDDDD;
    --light-color:        #EBD7CE;
    --medium-color:       #666666;

    --light-text-color:   --medium-color;
    --dark-text-color:    --darkest-color;

    --favorite-color:     #E35151;

    --base-font:    'Nunito', sans-serif;
    --support-font: 'Montserrat', sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--highlight-color);
    -webkit-box-shadow: inset 1px 1px 2px rgb(155 155 155 / 40%);
    -moz-box-shadow: inset 1px 1px 2px rgba(155, 155, 155, 0.4);
    box-shadow: inset 1px 1px 2px rgb(155 155 155 / 40%);
    border-radius: 4px;
    &:hover {
      background: ${darken(0.06, '#824D3E')};
    }
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    -webkit-box-shadow: inset 1px 1px 2px #e0e0e0;
    -moz-box-shadow: inset 1px 1px 2px #e0e0e0;
    box-shadow: inset 1px 1px 2px #e0e0e0;
    border: 1px solid #d8d8d8;
  }

  ::selection {
    background: var(--highlight-color);
    color: #fff;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px var(--base-font);
  }

  /*#root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }*/

  a, button {
    transition: all .2s ease-in-out;
  }

  button {
    cursor: pointer;
  }
`;
