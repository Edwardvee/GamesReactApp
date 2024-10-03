import { useEffect, useState } from "react";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import { Row, Col, Grid, Select, Spin } from "antd";
import styles from "./homepage.module.scss";
import { GlobalStateService } from "../../services/globalStateService";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import InfiniteScroll from "react-infinite-scroll-component";
export function Homepage() {
  const screens = Grid.useBreakpoint();
  const getColumnSpan = () => {
    if (screens.xl) return 8;
    else if (screens.lg) return 12;
    else if (screens.md) return 12;
    else if (screens.sm) return 24;
    return 24; // 1 column on smaller screens
  };
  let carousel = document.getElementById("carousel");
  useEffect(() => {
    let isDragging = false;
    let startX: number;
    let startScrollLeft: number;
    const dragStart = (e: any) => {
      isDragging = true;
      carousel?.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e: any) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      carousel.scrollLeft = startScrollLeft - x;
    };
    const dragStop = () => {
      isDragging = false;
      carousel?.classList.remove("dragging");
    };
    carousel?.addEventListener("mousemove", dragging);
    carousel?.addEventListener("mousedown", dragStart);
    carousel?.addEventListener("mouseup", dragStop);
    carousel?.addEventListener("mouseleave", dragStop);
    return () => {
      const carousel = document.getElementById("carousel");
      carousel?.removeEventListener("mousemove", dragging);
      carousel?.removeEventListener("mousedown", dragStart);
      carousel?.removeEventListener("mouseup", dragStop);
      carousel?.removeEventListener("mouseleave", dragStop);
    };
  }, [carousel]);

  const cGames = GlobalStateService.getGames();
  const dGames = GlobalStateService.getDiscoverGames();
  const cGamesPage = GlobalStateService.getGamesPage();

  useEffect(() => {
    GamesUseCases.getDiscoverGames(
      "page_size=15&ordering=released&page=1"
    ).finally(() => {
      carousel = document.getElementById("carousel");
      console.log(dGames);
      setDLoading(false);
    });
  }, []);

  const [dLoading, setDLoading] = useState(true);
  return (
    <>
      <h1 className={styles.title} style={{ paddingTop: "15px" }}>
        Discover new Games
      </h1>
      <div className={styles.discoverSection}>
        {dLoading ? (
          <Spin style={{ margin: "20px" }} tip="Loading" size="large"></Spin>
        ) : (
          <>
            <div className={styles.carousel} id="carousel">
              {dGames.map((game) => (
                <CardGameD
                  id={game.id}
                  title={game.title || "No info."}
                  imgSrc={game.image || "src/assets/img/notfound.png"}
                  releaseDate={game.releaseDate || "No info."}
                  genre={game.genres.map((g) => g.name) || "No info."}
                  platforms={
                    game.platforms.map((p) => p.platform.name) || "No info."
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.catalogSection} style={{}}>
        <h1 style={{ textAlign: "center" }}>Catalog</h1>
        <span
          style={{
            margin: "50px",
            marginLeft: "100px",
            textAlign: "center",
            minWidth: "150px",
          }}
        >
          Order by:
          <Select
            placeholder="Filter by"
            style={{ width: 120, marginInline: "20px" }}
            defaultValue={"Name"}
            options={[
              { value: "name", label: "Name" },
              { value: "releaseDate", label: "Release date" },
              { value: "rating", label: "Rating" },
            ]}
          />
        </span>

        <InfiniteScroll
          dataLength={cGames.length} //This is important field to render the next data
          next={() => {
            const nextPage = cGamesPage + 1;
            GamesUseCases.getGames("page=" + cGamesPage);
            GlobalStateService.setGamesPage(nextPage);
          }}
          hasMore={true}
          loader={
            <Spin style={{ margin: "20px" }} tip="Loading" size="large"></Spin>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row
            gutter={[16, 4]}
            justify="center"
            align={"middle"}
            style={{ marginTop: "20px" }}
          >
            {cGames.map((game) => (
              <Col key={game.id} span={getColumnSpan()} style={{ flex: 0 }}>
                <CardGameD
                  id={game.id}
                  title={game.title}
                  imgSrc={game.image || "src/assets/img/notfound.png"}
                  releaseDate={game.releaseDate || "No info."}
                  genre={game.genres.map((g) => g.name)}
                  platforms={game.platforms.map((p) => p.platform.name)}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
    </>
  );
}
