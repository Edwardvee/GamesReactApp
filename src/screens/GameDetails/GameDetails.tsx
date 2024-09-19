import { useParams } from "react-router-dom";
import styles from "./Gamedetails.module.scss";
import { useEffect, useState } from "react";

interface IRequirement {
  minimum: string;
  recommended: string;
}

interface IGameDetail {
  id: number;
  title: string;
  imgSrc: string;
  about: string;
  releaseDate: string;
  rating: number;
  genre: string[];
  platforms: string[];
  tags: string[];
  requirements: IRequirement;
}

const gameExample: IGameDetail[] = [
  {
    id: 1,
    title: "Bioshock",
    imgSrc: "/src/assets/img/bioshock.png",
    about:
      "FPS with RPG elements, Bioshock invites players to experience horrors of underwater isolation in the city of Rapture, the failed project of the better future. After surviving the plane crash, the protagonist has only one way to go  to the giant lighthouse that opens a way to the underwater utopia. Players will have to unravel the complicated history of Rapture, relying only on themselves, their guns and Plasmids, a mystical substance, that allows its user to obtain near magical abilities The atmosphere of isolation and threat is conveyed through the environmental sounds, subtle electrical buzzing and audio logs, telling the story of societal decay and despair.Players will shape the story, making moral choices along their way, saving Little Sisters or extracting ADAM, the mystical fuel for your abilities.While exploring the underwater city, players will complete missions for the last sane inhabitants of Rapture, while fending off the less fortunate ones.",
    genre: ["Action", "Shooter"],
    platforms: ["PC", "Xbox360", "PS3"],
    tags: ["Singleplayer"],
    rating: 5.3,
    releaseDate: "11-11-2009",
    requirements: {
      minimum:
        "Minimum: Operating System: Windows XP (with Service Pack 2) or Windows Vista\nCPU: Intel single-core Pentium 4 processor at 2.4GHz\nRAM: 1 GB\nVideo Card: Direct X 9.0c compliant video card with 128MB RAM and Pixel Shader 3.0 (NVIDIA 6600 or better/ATI X1300 or better, excluding ATI X1550)\nSound Card: 100% direct X 9.0c compatible sound card\nHard Drive Space: 8GB\nGame requires Internet connection for activation.",
      recommended:
        "Recommended: CPU: Intel Core 2 Duo processor\nRAM: 2GB\nVideo Card: DX 9 - Direct X 9.0c compliant video card with 512 MB RAM and Pixel Shader 3.0 (NVIDIA GeForce 7900 GT or better), DX 10 - NVIDIA GeForce 8600 or better\nSound Card: SoundBlaster(r) X-Fi(tm) series (optimized foruse with Creative Labs EAX ADVANCED HD 4.0 or EAX ADVANCED HD 5.0 compatible sound cards)",
    },
  },
];

export const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState<IGameDetail>();
  function findGame() {
    const gameResult = gameExample.find((s) => String(s.id) === String(id));
    if (gameResult) {
      setGame(gameResult);
    }
  }
  useEffect(() => {
    if (id) {
      findGame();
    }
  }, [id]);

  return (
    <>
      <div className={styles.gameDetails}>
        <h1>{game?.title}</h1>
        <div className={styles.detailContainer}>
          <div className={styles.imgCover}>
            <img src={game?.imgSrc} alt="Cover" />
          </div>
          <div className={styles.aboutSection}>
            <h2>About</h2>
            <p>{game?.about}</p>

            <p>Rating: {game?.rating}</p>
            <p>Platforms: {game?.platforms.join(", ")}</p>
            <p>Buy at: </p>
            <p>Genre: {game?.genre.join(", ")}</p>
            <p>Release date: {game?.releaseDate} </p>
          </div>
        </div>

        <div className={styles.moreInformation}>
          <div className={styles.tags}>
            <h3>Tags</h3>
            <p>{game?.tags.join(", ")}</p>
          </div>
          <div className={styles.requirements}>
            <h3> System requirements for PC</h3>
            <p>{game?.requirements.minimum}</p>
            <p>{game?.requirements.recommended}</p>
          </div>
        </div>
      </div>
    </>
  );
};
