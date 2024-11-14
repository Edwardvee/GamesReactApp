import { CheckCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import styles from "./index.module.scss";

interface CardComponent {
  id: string;
  title: string;
  imgSrc: string;
  releaseDate: string;
  genre: string[];
  platforms: string[];
  source: string;
  fav: boolean;
}

export const CardGameD: React.FC<CardComponent> = ({
  id,
  title,
  imgSrc,
  releaseDate,
  genre,
  platforms,
  fav,
  source,
}) => {
  const [favState, setFavState] = useState(fav);

  return (
    <>
      <Card
        hoverable
        className={styles.gamecard}
        bordered={false}
        cover={
          <img
            className={styles.imgCard}
            draggable={false}
            alt="Cover"
            src={imgSrc}
          />
        }
      >
        <div className={styles.titleHoverContainer}>
          <Link
            draggable={false}
            to={{ pathname: "/details/" + id, search: "?source=" + source }}
            className={styles.titleHover}
          >
            {title}
          </Link>
          {favState ? (
            <CheckCircleFilled
              className={styles.PlusHover}
              onClick={() => {
                setFavState(false);
                GamesUseCases.removeFavorites(id);
              }}
            />
          ) : (
            <PlusCircleFilled
              className={styles.PlusHover}
              onClick={() => {
                setFavState(true);
                GamesUseCases.setFavorites(id, source);
              }}
            />
          )}
        </div>
        <Card.Meta title={title} className={styles.title} />
        <div className={styles.cardcontent}>
          <p>Release date: {releaseDate}</p>
          <p>Genre: {genre.join(", ")} </p>
          <p>Platforms: {platforms.join(", ")}</p>
        </div>
      </Card>
    </>
  );
};
