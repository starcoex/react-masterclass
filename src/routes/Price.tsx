import React from 'react'
import { useQuery } from 'react-query'
import { fetchTickers } from '../api'
import ApexChart from "react-apexcharts"
import { isDarkAtom } from '../atoms'
import { useRecoilValue } from 'recoil'

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
  // const dataObj = Object.values(data?.quotes.USD)
  const isDark = useRecoilValue(isDarkAtom)

  return (
    <div>{isLoading ? "Loading..." : <ApexChart
      type='line'
      // series={[
      //   {
      //     name: "USD",
      //     data: [data?.quotes.USD.percent_change_12h, data?.quotes.USD.percent_change_15m],
      //   }
      // ]}
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          width: 500,
          height: 500,
          toolbar: {
            show: false,
          }
        },
        stroke: {
          curve: "smooth",
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: false },
          type: "datetime",
          // categories: data?.map((chart) => chart.time_close),
          // categories: data?.map((chart) => new Date(chart.time_close * 1000).toISOString())
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["blue"],
            stops: [0, 100]
          },
        },
        colors: ["red"]
      }} />}</div>
  )
}
