import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from "react-helmet"


const Container = styled.div`
background-color:${(props) => props.theme.bgColor};
padding:0 20px;
max-width:482px;
margin: 0 auto;
`;
const Header = styled.header`
color:${(props) => props.theme.textColor};
height: 15vh;
display:flex;
justify-content:center;
align-items:center;
button{

}

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
const CoinList = styled.ul`

`


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
const CoinWrapper = styled.div`
display:flex;
align-items:center;

`

const Title = styled.h1`
font-size:48px;
color:${props => props.theme.accentColor};
`
const Loading = styled.span`
padding-top:10px;
display:block;
text-align:center;
font-size:28px;
font-weight:800;
`
const CoinImage = styled.img`
width:50px;
height:50px;
margin: 0 5px;
`


interface CoinFetch {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}
interface ToggleCoinsProps {
  toggleDark: () => void

}

export default function Coins({ toggleDark }: ToggleCoinsProps) {
  const { isLoading, data } = useQuery<CoinFetch[]>("allCoins", fetchCoins)
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet >
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDark}>toggle</button>
      </Header>
      {isLoading ? <Home><Link to={"/"}>Home</Link> </Home> : null}
      {isLoading ? (<Loading>Loading...</Loading>) : <CoinList>
        {data?.slice(0, 100).map((coin) => <Coin key={coin.id} > <Link to={{
          pathname: coin.id,
          state: { name: coin.name }
        }}>
          <CoinWrapper>{coin.name}<CoinImage src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} /> <FontAwesomeIcon icon={faArrowRight} /> </CoinWrapper></Link></Coin>)}
      </CoinList>}
    </Container >
  )
}
