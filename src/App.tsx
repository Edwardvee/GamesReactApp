import { Outlet } from "react-router-dom";
import "./scss/_base.scss";
import { NavbarComp } from "./components/Navbar/Navbar";
import { ConfigProvider } from "antd";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#41445a",
          colorInfo: "#41445a",
          colorBgBase: "#41445a",
          colorBorder: "#fff",
          colorFillContent: "#fff",
          colorBgContainer: "#5a6474",
          colorText: "#fff",
          colorTextPlaceholder: "#fff",
          wireframe: false,
        },
      }}
    >
      <NavbarComp></NavbarComp>
      <main>
        <Outlet></Outlet>
      </main>
    </ConfigProvider>
  );
}

export default App;
