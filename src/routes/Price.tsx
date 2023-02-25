import React from 'react'
import { useQuery } from 'react-query'
import { fetchTickers } from '../api'
import ApexChart from "react-apexcharts"
import { isDarkAtom } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendDown, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'

// const Label = styled.label``
// const GridContainer = styled.div``
// const BigGridItem = styled.div``
// const GridItem = styled.div``
const Label = styled.div`
	font-size: 0.9rem;
	font-weight: 700;
	opacity: 0.6;
`;

const GridItem = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	padding: 1rem;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

const BigGridItem = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 1.2rem;
	justify-content: space-between;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	& > ${Label} {
		line-height: 1.5;
	}
	& > div:last-child {
		font-size: 2rem;
		font-weight: 300;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 6rem;
	gap: 1rem;
`;
const PriceIndicatorStyled = styled.div<{ percentage?: number }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	font-size: 2rem;
	font-weight: 300;

`;



interface PriceIndicatorProps {
  percentage: number;
}

function PriceIndicator({ percentage }: PriceIndicatorProps) {
  return (
    <div >
      <div>{percentage.toFixed(1)}%</div>
      <FontAwesomeIcon icon={percentage > 0 ? faArrowTrendDown : faArrowTrendUp} />
      {/* <MaterialIcon name={percentage > 0 ? "trending_up" : percentage === 0 ? "trending_flat" : "trending_down"} /> */}
    </div>
  );
}
// const PriceIndicatorStyled = styled(PriceIndicator) <{ percentage: number }>`
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	width: 100%;
// 	justify-content: space-between;
// 	font-size: 2rem;
// 	font-weight: 300;
// 	color: ${(props) =>
//     props.percentage > 0
//       ? props.theme.upwardColor
//       : props.percentage === 0
//         ? props.theme.flatColor
//         : props.theme.downwardColor};
// `;

interface PriceProps {
  coinId: string
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
export default function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceCoinFeth>("price", () => fetchTickers(coinId))
  const isDark = useRecoilValue(isDarkAtom)
  const quotes = data?.quotes.USD;

  return (
    <div>{isLoading ? "Loading..." : <GridContainer>
      <BigGridItem>
        <Label>
          {data?.quotes.USD.ath_price.toFixed(2)}
          <br />
          최고가 달성
        </Label>
      </BigGridItem>
      <GridItem>
        <Label>1시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_1h} />
      </GridItem>
      <GridItem>
        <Label>6시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_6h} />
      </GridItem>
      <GridItem>
        <Label>12시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_12h} />
      </GridItem>
      <GridItem>
        <Label>24시간 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_24h} />
      </GridItem>
      <GridItem>
        <Label>7일 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_7d} />
      </GridItem>
      <GridItem>
        <Label>30일 전보다</Label>
        <PriceIndicatorStyled percentage={quotes?.percent_change_30d} />
      </GridItem>
    </GridContainer>
    }</div>
  )
}
