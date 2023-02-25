import React, { Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { darkTheme, lightTheme } from './Theme';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './recoil/atoms';
import GlobalStyle from './styles/GlobalStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 1.6rem;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
  box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2rem 0.75rem rgba(10, 10, 10, 0.2);
  }
  &:active {
    background-color: ${(props) => props.theme.activeCardColor};
    box-shadow: 0 0.1rem 0.5rem rgba(10, 10, 10, 0.2);
  }
`;
function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Fragment>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ToggleBtn onClick={toggleDarkAtom}>
          <FontAwesomeIcon icon={isDark ? faLightbulb : faMoon} />
        </ToggleBtn>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
