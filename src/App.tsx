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
          colorBgContainer: "#5a6474",
          colorText: "#fff",
          colorBgElevated: "#5a6474",
          colorTextPlaceholder: "#fff",
          wireframe: false,
        },
        components: {
          Message: {
            colorText: "#5a6474",
            contentBg: "#5a6474",
          },
          Select: {
            colorText: "rgb(255,255,255)",
          },
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
