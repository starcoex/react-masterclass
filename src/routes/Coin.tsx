import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 0 20px;
  max-width: 482px;
  margin: 0 auto;
`;
const Header = styled.header`
  color: ${(props) => props.theme.textColor};
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Home = styled.h1`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 20px;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loading = styled.span`
  padding-top: 10px;
  display: block;
  text-align: center;
  font-size: 28px;
  font-weight: 800;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 12px;
    font-weight: 540;
    margin-bottom: 10px;
  }
  span:last-child {
    font-size: 15px;
  }
`;
const Description = styled.div`
  margin: 20px 0;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Linkview = styled.span<{ isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }

  /* display: flex;
justify-content:space-between;
margin-top:20px; */
`;
// const Price = styled.div``
// const Chart = styled.div``
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface StateLocation {
  name: string;
}
interface CoinFetch {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tag: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceCoinFeth {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState<CoinFetch>();
  const [priceCoin, setPriceCoin] = useState<PriceCoinFeth>();
  const { state } = useLocation<StateLocation>();
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const json = await response.json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setCoin(json);
      setPriceCoin(priceData);
      setLoading(false);
      console.log(json);
      console.log(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        {/* <Title>{state?.name || "Loading..."}</Title> */}
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : coin?.name}
        </Title>
      </Header>
      {loading ? null : (
        <Home>
          <Link to={'/'}>Home</Link>{' '}
        </Home>
      )}
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Overview>
          <OverviewItem>
            <span>RANK:</span>
            <span>{coin?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>SYSBOL:</span>
            <span>{coin?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>OPEN SOURCE:</span>
            <span>{coin?.open_source || 'false'}</span>
          </OverviewItem>
        </Overview>
      )}
      <Description> {coin?.description}</Description>
      <Overview>
        <OverviewItem>
          <span>TOTAL SUPLY:</span>
          <span>{priceCoin?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>MAX SUPLY:</span>
          <span>{priceCoin?.max_supply}</span>
        </OverviewItem>
      </Overview>
      <Tabs>
        <Linkview isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Linkview>
        <Linkview isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Linkview>
      </Tabs>
      <Switch>
        <Route path={`/${coinId}/price`}>
          <Price />
        </Route>
        <Route path={`/${coinId}/chart`}>
          <Chart />
        </Route>
      </Switch>
    </Container>
  );
}
