import React from 'react'
import { useQuery } from 'react-query'
import { fetchChart } from '../api'
import ApexChart from "react-apexcharts"
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atoms'

interface ChartProps {
  coinId: string

}
interface ChartFetch {
  time_open: number
  time_close: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  market_cap: number
}



export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<ChartFetch[]>("chart", () => fetchChart(coinId))
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <div>{isLoading ? "Loading..." : <ApexChart
      type='line'
      series={[
        {
          name: "Price",
          data: data?.map((chart) => parseFloat(chart.close)) ?? [],
        },
      ]}
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
          categories: data?.map((chart) => new Date(chart.time_close * 1000).toISOString())
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
