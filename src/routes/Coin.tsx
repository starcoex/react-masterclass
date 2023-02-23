import React from 'react'
import { useParams } from 'react-router-dom'

interface RouteParams {
  coinId: string
}
export default function Coin() {
  // console.log(useParams())
  const { coinId } = useParams<RouteParams>()
  console.log(coinId)
  return (
    <div>Coin : {coinId}</div>
  )
}
