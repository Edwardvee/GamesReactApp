import React, { useEffect } from "react";
import { Row, Col, Card, Grid } from "antd";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import { GlobalStateService } from "../../services/globalStateService";
export function Favorites() {
  const screens = Grid.useBreakpoint();

  const getColumnSpan = () => {
    if (screens.xl) return 8;
    else if (screens.lg) return 12;
    else if (screens.md) return 12;
    else if (screens.sm) return 24;
    return 24; // 1 column on smaller screens
  };
  const games = GlobalStateService.getGameInfo();
  useEffect(() => {
    GamesUseCases.getGameInfo("1");
    console.log(games);
  }, []);
  const cardsData = [
    <CardGameD
      id={1}
      title={"The Legend of Zelda Twilight Princess"}
      imgSrc="/src/assets/img/TLOZ.jpg"
      releaseDate="11-9-2006"
      genre={["Action", "Fantasy"]}
      platforms={["Wii U", "Gamecube"]}
    />,
    <CardGameD
      id={2}
      title={"Shadow the Hedgehog"}
      imgSrc="/src/assets/img/shadow.jpg"
      releaseDate="11-11-2005"
      genre={["Action"]}
      platforms={["Gamecube", "Xbox", "PS3", "PS2"]}
    />,
    <CardGameD
      id={3}
      title={"Portal 2"}
      imgSrc="/src/assets/img/portal.jpg"
      releaseDate="18-4-2011"
      genre={["Puzzle", "Shooter"]}
      platforms={["PC", "Xbox360", "PS3"]}
    />,
    <CardGameD
      id={4}
      title={"BioShock"}
      imgSrc="src/assets/img/bioshock.png"
      releaseDate="21-8-2007"
      genre={["Action", "Shooter"]}
      platforms={["PC", "Xbox360", "PS3"]}
    />,
    <CardGameD
      id={5}
      title={"Metal Gear Rising: Revengeance"}
      imgSrc="src/assets/img/mgr.jpeg"
      releaseDate="19-2-2013"
      genre={["Action"]}
      platforms={["PS3", "Xbox360", "PC"]}
    />,
  ];

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
          {cardsData.map((card) => (
            <Col key={card.props.id} span={getColumnSpan()} style={{ flex: 0 }}>
              {card}
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
