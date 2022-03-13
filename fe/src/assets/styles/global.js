import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    font-size: 16px;
    background: ${({ theme }) => theme.colors.background};
    color: #222;
    cursor: initial;
  }

  button {
    cursor: pointer;
  }
`;
