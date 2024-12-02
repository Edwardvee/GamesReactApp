import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.scss";
import { Input } from "antd";
export function NavbarComp() {
  const { Search } = Input;
  const navigate = useNavigate();
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
          onSearch={(title: string) => {
            if (title.trim() !== "") {
              // Navega a la página de resultados de búsqueda con el título

              navigate(`/search?title=${encodeURIComponent(title)}`);
              window.location.reload();
            }
          }}
          placeholder="Search games"
        />
      </div>
    </div>
  );
}
