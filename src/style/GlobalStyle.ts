import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Montserrat:ital,wght@0,500;1,200&family=Noto+Sans+KR:wght@100;300;400;500;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,600&family=Source+Sans+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Montserrat:ital,wght@0,500;1,200&family=Nanum+Gothic:wght@700;800&family=Noto+Sans+KR:wght@100;300;400;500;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,600&family=Source+Sans+Pro&display=swap');
${reset}
body{
  font-family: 'Montserrat', sans-serif;
  background: ${({ theme }) => theme.background1};
  color: ${({ theme }) => theme.text};
  transition: background 0.2s ease-in, color 0.2s ease-in;
}
a {
  text-decoration:none;
  color:inherit;
}
* {
  box-sizing:border-box;
}
button {
  cursor: pointer;
  border:none;
}
`;

export default GlobalStyle;
