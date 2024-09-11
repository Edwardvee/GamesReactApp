import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import { Homepage } from '../screens/Homepage/Homepage'
import { Favorites } from '../screens/Favorites/Favorites'
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {path: "", element: <Homepage/>},
        {path: "favorites", element: <Favorites/>}
  
      ],
    }
  ])

