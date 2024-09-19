import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { Homepage } from '../screens/Homepage/Homepage'
import { GameDetails } from '../screens/GameDetails/GameDetails'
import { EditGame } from '../screens/EditGame/EditGame'
import { CreateGame } from '../screens/CreateGame/CreateGame'
import { Favorites } from '../screens/Favorites/Favorites'
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {path: "", element: <Homepage/>},
        {path: "favorites", element: <Favorites/>},
        {path: "details/:id", element: <GameDetails />},
        {path: "create", element: <CreateGame/>},
        {path: "edit/:id", element: <EditGame/>}
  
      ],
    }
  ])

