import { BrowserRouter, Route, Switch } from "react-router-dom"
import Coin from './routes/Coin'
import Coins from './routes/Coins'

interface ToggleRouterProps {
  toggleDark: () => void
  isDark: boolean
}


export default function Router({ toggleDark, isDark }: ToggleRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId" >
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>

  )
}
