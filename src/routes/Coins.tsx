import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
const Container = styled.div`
background-color:${(props) => props.theme.bgColor};
padding:0 20px;
`;
const Header = styled.header`
color:${(props) => props.theme.textColor};
height: 15vh;
display:flex;
justify-content:center;
align-items:center;

`
const Home = styled.h1`
background-color:white;
color:${props => props.theme.bgColor};
border-radius:15px;
margin-bottom:10px;
padding:20px;
height: 15vh;
display:flex;
justify-content:center;
align-items:center;
`
const CoinList = styled.ul``


const Coin = styled.li`
background-color:white;
color:${props => props.theme.bgColor};
border-radius:15px;
margin-bottom:10px;
padding:20px;
a{
      padding:20px;
  transition: color 0.2s ease-in;
}
&:hover{
  a{

    color:${props => props.theme.accentColor}
  }
}
`
const Title = styled.h1`
font-size:48px;
color:${props => props.theme.accentColor};
`

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];
export default function Coins() {
  const coinId = useParams()
  console.log(coinId)
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {/* {coins.map((coin) => <Home><Link to={`${coin.id}`}>Home</Link> </Home>)} */}
      <Home><Link to={"/"}>Home</Link> </Home>
      <CoinList>
        {coins.map((coin) => <Coin key={coin.id} > <Link to={`${coin.id}`}>{coin.name}<FontAwesomeIcon icon={faArrowRight} /> </Link></Coin>)}
      </CoinList>
    </Container >

  )
}