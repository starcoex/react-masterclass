import React, { Fragment, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import './App.css';
import Router from './Router';
import { ReactQueryDevtools } from "react-query/devtools"
import { darkTheme, lightTheme } from './theme';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Montserrat:ital,wght@0,500;1,200&family=Noto+Sans+KR:wght@100;300;400;500;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,600&family=Source+Sans+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Montserrat:ital,wght@0,500;1,200&family=Nanum+Gothic:wght@700;800&family=Noto+Sans+KR:wght@100;300;400;500;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;1,600&family=Source+Sans+Pro&display=swap');
${reset}
body{
font-family: 'Montserrat', sans-serif;
background-color:${props => props.theme.bgColor};
color:${props => props.theme.textColor}
}
a {
  text-decoration:none;
  color:inherit;
}
*{
  box-sizing:border-box;
}
`



function App() {
  const [isDark, setIsDark] = useState(true)
  const toggleDark = () => {
    setIsDark((current) => !current)
  }

  return (
    <Fragment >
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router toggleDark={toggleDark} isDark={isDark} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
