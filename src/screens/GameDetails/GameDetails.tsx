import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Gamedetails.module.scss";
import { GlobalStateService } from "../../services/globalStateService";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import { Skeleton } from "antd";
export const GameDetails = () => {
  const { id } = useParams();
  const game = GlobalStateService.getGameInfo()[0];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add(styles.gameDetailsBody);
    return () => {
      document.body.classList.remove(styles.gameDetailsBody);
    };
  });
  useEffect(() => {
    if (id) {
      GamesUseCases.getGameInfo(id);
    }
  }, [id]);
  useEffect(() => {
    if (game) {
      setLoading(false);
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
                {game?.platforms.map((p, index) => (
                  <Link key={index} to="#">
                    {p.platform.name}
                    {index < game?.platforms.length - 1 && ", "}
                  </Link>
                ))}
              </p>
              <p>Buy at: </p>
              <p>
                Genre:{" "}
                {game?.genre.map((g, index) => {
                  return (
                    <Link key={"genre" + index} to={"#" + g.name}>
                      {g.name}
                      {index < game?.genre.length - 1 && ", "}
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
              {game?.tags.map((t, index) => (
                <Link key={"tag" + index} to={"#" + t.name}>
                  {t.name}
                  {index < game?.tags.length - 1 && ", "}
                </Link>
              ))}
            </p>
          </div>
          <div className={styles.requirements}>
            {game?.platforms.map((p, index) =>
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
        </div>
      </div>
    </>
  );
};
