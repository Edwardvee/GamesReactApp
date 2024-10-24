import { useEffect, useState } from "react";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import { Row, Col, Grid, Select, Spin } from "antd";
import styles from "./homepage.module.scss";
import { GlobalStateService } from "../../services/globalStateService";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import InfiniteScroll from "react-infinite-scroll-component";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";

import type { SelectProps } from "antd";

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
      startScrollLeft = carousel!.scrollLeft;
    };
    const dragging = (e: any) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      carousel!.scrollLeft = startScrollLeft - x;
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
  const gamesItems = GlobalStateService.getItems();
  const [dLoading, setDLoading] = useState(true);
  useEffect(() => {
    GamesUseCases.getDiscoverGames(1, {
      param: "ordering",
      value: "released",
    }).finally(() => {
      carousel = document.getElementById("carousel");
      console.log(cGames);
      setDLoading(false);
    });
    JSONGamesUseCases.getItems();
    console.log(cGames);
  }, []);
  let dataLength = cGames.length;

  const [source, sourceState] = useState("api");
  const changeSource = (value: string) => {
    setFiltersOptionState(value);
    sourceState(value);
    refreshCatalog();
  };
  const [filter, setFilterState] = useState("");
  const changeFilter = (value: string) => {
    setFilterState(value);
    refreshCatalog();
  };
  const [filtersOption, setFiltersOptionState] = useState("api");
  const filtersAPI = [
    { value: "name", label: "Name" },
    { value: "-metacritic", label: "Metacritic" },
    { value: "released", label: "Release date" },
    { value: "-rating", label: "Rating" },
    { value: "-added", label: "Added" },
    { value: "-updated", label: "Updated" },
  ];
  const filtersJSON = [{ value: "name", label: "Name" }];
  const [hasMore, hasMoreState] = useState(true);
  const refreshCatalog = () => {
    GlobalStateService.deleteGames();
    GlobalStateService.setGamesPage(1);
  };

  const Genres = GlobalStateService.getGenres();
  const Platforms = GlobalStateService.getPlatforms();
  useEffect(() => {
    GamesUseCases.getGenres();
    GamesUseCases.getPlatforms();
  }, []);

  const genresOptions: SelectProps["options"] = Genres.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const platformsOptions: SelectProps["options"] = Platforms.map((p) => ({
    label: p.name,
    value: p.id,
  }));

  const [genres, genresState] = useState([""]);
  const [platforms, platformState] = useState([""]);

  const setUpGenres = (value: string[]) => {
    refreshCatalog();
    genresState(value);
  };
  const setUpPlatforms = (value: string[]) => {
    refreshCatalog();
    platformState(value);
  };
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
                  source={game.source}
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
            color: "#fff",
          }}
        >
          Order by:
          <Select
            placeholder="Filter by"
            style={{ width: 120, marginInline: "20px" }}
            defaultValue={"Name"}
            maxTagCount={"responsive"}
            onChange={changeFilter}
            options={filtersOption == "api" ? filtersAPI : filtersJSON}
          />
          <Select
            defaultValue="api"
            style={{ width: 120 }}
            maxTagCount={"responsive"}
            onChange={changeSource}
            options={[
              { value: "api", label: "API" },
              { value: "json", label: "JSON DB" },
            ]}
          />
          <Select
            mode="multiple"
            style={{ width: 220, marginInline: "20px" }}
            allowClear
            placeholder="Filter genres"
            onChange={setUpGenres}
            maxTagCount={"responsive"}
            options={genresOptions}
          />
          <Select
            mode="multiple"
            style={{ width: 220 }}
            allowClear
            maxTagCount={"responsive"}
            placeholder="Filter platforms"
            onChange={setUpPlatforms}
            options={platformsOptions}
          />
        </span>

        <InfiniteScroll
          dataLength={cGames.length}
          next={() => {
            console.log(hasMore);
            if (source == "api") {
              console.log(cGames.length);
              GamesUseCases.getGames(
                cGamesPage,
                {
                  param: "ordering",
                  value: filter ? filter : "Updated",
                },
                genres.join(","),
                platforms.join(",")
              ).then((newGames) => {
                GlobalStateService.setGamesPage(cGamesPage + 1);
              });
            } else {
              JSONGamesUseCases.GetGames(cGamesPage.toString()).then(
                (newGames) => {
                  const totalItems = GlobalStateService.getItems();
                  console.log(cGames.length);
                  console.log(totalItems);

                  if (totalItems <= cGames.length) {
                    hasMoreState(false);
                    console.log("set false");
                    console.log(hasMore);
                  } else {
                    GlobalStateService.setGamesPage(cGamesPage + 1);
                  }
                }
              );
            }
          }}
          hasMore={hasMore}
          refreshFunction={refreshCatalog}
          loader={
            <Spin style={{ margin: "20px" }} tip="Loading" size="large"></Spin>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>That's the end.</b>
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
                  source={game.source}
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
