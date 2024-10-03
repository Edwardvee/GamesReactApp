import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { Input } from "antd";
export function NavbarComp() {
  const { Search } = Input;
  return (
    <div className={styles.navbar}>
      <Link to={"/"}>Home</Link>
      <Link to={"/library"}>My library</Link>
      <Link to={"/create"}>Add a game</Link>
      <div className={styles.searchBar}>
        <Search
          style={{
            marginRight: "10px",
          }}
          placeholder="Search games"
        />
      </div>
    </div>
  );
}
