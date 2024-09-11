import { Link } from "react-router-dom"
import styles from "./navbar.module.scss"
export function NavbarComp() {
    return (
        
            <div className={styles.navbar}>
                <Link to={"/"}>Home</Link>
                <Link to={"/favorites"}>Favorites</Link>
            </div>
        
    )
}   