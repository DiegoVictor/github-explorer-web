import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background-color: #7159C1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222222;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  button {
    cursor: pointer;
  }
`;
