import { Outlet } from "react-router-dom"
import "./scss/_base.scss"
import { NavbarComp } from "./components/Navbar/Navbar"
function App() {
  return (
    <>
      <NavbarComp></NavbarComp>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default App