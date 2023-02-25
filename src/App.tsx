import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './style/theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
import GlobalStyle from './style/GlobalStyle';

function App() {
  // const [isDark, setIsDark] = useState(true)
  // const toggleDark = () => {
  //   setIsDark((current) => !current)
  // }

  const isDark = useRecoilValue(isDarkAtom);
  return (
    <Fragment>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
