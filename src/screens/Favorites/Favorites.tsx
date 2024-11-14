import { Col, Grid, Row } from "antd";
import { useEffect } from "react";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import { GlobalStateService } from "../../services/globalStateService";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";
import styles from "./index.module.scss";
export function Favorites() {
  const screens = Grid.useBreakpoint();

  const getColumnSpan = () => {
    if (screens.xl) return 8;
    else if (screens.lg) return 12;
    else if (screens.md) return 12;
    else if (screens.sm) return 24;
    return 24; // 1 column on smaller screens
  };
  const games = GlobalStateService.getFavorites();
  const favIDS = GlobalStateService.getFavoritesIDS();

  useEffect(() => {
    JSONGamesUseCases.GetFavorites();

    console.log(favIDS);
  }, []);
  return (
    <>
      <div
        className="FavoriteSection"
        style={{
          width: "100vw",
          height: "100vh",
          flexWrap: "wrap",
          margin: "auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Your library</h1>
        <Row gutter={[16, 4]} justify="center" align={"middle"}>
          {games.map((game) => (
            <Col
              key={game.id}
              span={getColumnSpan()}
              className={styles.columnFavorites}
              style={{ flex: 0, zIndex: 1, maxHeight: "235px" }}
            >
              <CardGameD
                id={game.id}
                fav={favIDS.includes(game.id) ? true : false}
                source={game.source}
                title={game.title}
                imgSrc={game.image || "notfound.png"}
                releaseDate={game.releaseDate || "No info."}
                genre={game.genres.map((g) => g.name)}
                platforms={game.platforms.map((p) => p.platform.name)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
