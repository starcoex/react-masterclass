import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoin, fetchTickers } from '../api';
import Chart from './Chart';
import Price from './Price';

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  background-color: ${(props) => props.theme.background1};
  padding: 0 20px;
  max-width: 482px;
  margin: 0 auto;
`;
const Header = styled.header`
  color: ${(props) => props.theme.text};
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Home = styled.h1`
  background-color: ${(props) => props.theme.background1};
  color: ${(props) => props.theme.text};
  border-radius: 15px;
  margin-bottom: 10px;
  padding: 20px;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  a {
    font-weight: 600;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.boardBorder1};
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
  background-color: ${(props) => props.theme.boardBorder1};
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

  padding: 20px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.boardBorder1 : props.theme.text};
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
interface CoinProps {}

export default function Coin() {
  const { isLoading: coinLoading, data: coinData } = useQuery<CoinFetch>(
    'coin',
    () => fetchCoin(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<PriceCoinFeth>('tickers', () => fetchTickers(coinId));
  const { state } = useLocation<StateLocation>();
  const { coinId } = useParams<RouteParams>();
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const history = useHistory();
  const handleHistory = () => {
    history.goBack();
  };
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : coinLoading
            ? 'Loading...'
            : coinData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : coinLoading
            ? 'Loading...'
            : coinData?.name}
        </Title>
      </Header>
      {coinLoading ? null : (
        <Home>
          <Link to={'/'}>Home</Link>
          <FontAwesomeIcon onClick={handleHistory} icon={faArrowLeft} />
        </Home>
      )}
      {coinLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Overview>
          <OverviewItem>
            <span>RANK:</span>
            <span>{coinData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>SYSBOL:</span>
            <span>{coinData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>OPEN SOURCE:</span>
            <span>{coinData?.open_source || 'false'}</span>
          </OverviewItem>
        </Overview>
      )}
      <Description> {coinData?.description}</Description>
      <Overview>
        <OverviewItem>
          <span>TOTAL SUPLY:</span>
          <span>{tickersData?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>MAX SUPLY:</span>
          <span>{tickersData?.max_supply}</span>
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
          <Price coinId={coinId} />
        </Route>
        <Route path={`/${coinId}/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
}
