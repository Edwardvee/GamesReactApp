import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GlobalStateService } from "../../services/globalStateService";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";
import { Image, Row, Col, Grid } from "antd";

import styles from "./Gamedetails.module.scss";
export const GameDetails = () => {
  const { id } = useParams();
  const game = GlobalStateService.getGameInfo()[0];
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const source = new URLSearchParams(location.search).get("source");
  const screens = Grid.useBreakpoint();
  const getColumnSpan = () => {
    if (screens.xl) return 8;
    else if (screens.lg) return 12;
    else if (screens.md) return 12;
    else if (screens.sm) return 24;
    return 24; // 1 column on smaller screens
  };
  useEffect(() => {
    document.body.classList.add(styles.gameDetailsBody);
    return () => {
      document.body.classList.remove(styles.gameDetailsBody);
    };
  });
  useEffect(() => {
    if (id) {
      if (source == "api") {
        GamesUseCases.getGameInfo(id);
      } else if (source == "json") {
        JSONGamesUseCases.GameInfo(id);
      }
    }
  }, [id, source]);
  useEffect(() => {
    if (game) {
      setLoading(false);
      console.log(game);
    }
  }, [game]);

  return (
    <>
      <div className={styles.gameDetails}>
        <div
          className={styles.divCover}
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(65, 68, 90, 1) , rgba(0, 0, 0, 0)), linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0,0.6)),url(" +
              game?.backgroundImage +
              ")",
          }}
        >
          <h1 style={{ paddingTop: "40px" }}>
            {loading ? <Skeleton /> : game?.title}
          </h1>
          <div className={styles.detailContainer}>
            <div className={styles.imgCover}>
              <img src={game?.backgroundImage} alt="Cover" />
            </div>
            <div className={styles.aboutSection}>
              <h2>About</h2>
              <p>{loading ? <Skeleton /> : game?.about}</p>
              <p>Rating: {game?.rating}</p>
              <p>
                Platforms:{" "}
                {game?.platforms?.map((p, index) => (
                  <Link key={index} to="#">
                    {p.platform.name}
                    {index < game?.platforms.length - 1 && ", "}
                  </Link>
                ))}
              </p>
              <p>Buy at: </p>
              <p>
                Genre:{" "}
                {game?.genres?.map((g, index) => {
                  return (
                    <Link key={"genre" + index} to={"#" + g.name}>
                      {g.name}
                      {index < game?.genres.length - 1 && ", "}
                    </Link>
                  );
                })}
              </p>
              <p>Release date: {game?.releaseDate} </p>
            </div>
          </div>
        </div>
        <div className={styles.moreInformation}>
          <div className={styles.tags}>
            <h3>Tags</h3>
            <p>
              {game?.tags?.map((t, index) => (
                <Link key={"tag" + index} to={"#" + t.name}>
                  {t.name}
                  {index < game?.tags.length - 1 && ", "}
                </Link>
              ))}
            </p>
          </div>
          <div className={styles.requirements}>
            {game?.platforms?.map((p, index) =>
              p.requirements.minimum ? (
                <div key={"platform" + index}>
                  <h3>System requirements for {p.platform.name}</h3>
                  <p>{p.requirements.minimum}</p>
                  <p>{p.requirements.recommended}</p>
                </div>
              ) : (
                <div key={index}></div>
              )
            )}
          </div>
          <div className={styles.screenshots}>
            <h3>Screenshots</h3>

            <Row
              gutter={[16, 4]}
              justify="center"
              align={"middle"}
              style={{ marginTop: "20px" }}
            >
              {game?.screenshots?.map((s, index) => (
                <Col key={s.id} span={getColumnSpan()} style={{ flex: 0 }}>
                  <Image width={200} src={s.image} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
