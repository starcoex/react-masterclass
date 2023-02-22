import React from 'react';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
background-color:${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
color:${(props) => props.theme.textColor};
`

function App() {
  return (
    <Container >
      <H1>text</H1>
    </Container>
  );
}

export default App;
