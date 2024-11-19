import { Col, Grid, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import { GlobalStateService } from "../../services/globalStateService";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";
import styles from "./homepage.module.scss";
import type { SelectProps } from "antd";

export function Homepage() {
  const screens = Grid.useBreakpoint();
  const getColumnSpan = () => {
    if (screens.xl) return 8;
    else if (screens.lg) return 12;
    else if (screens.md) return 12;
    else if (screens.sm) return 24;
    return 24;
  };
  let carousel = document.getElementById("carousel");
  const favorites = GlobalStateService.getFavoritesIDS();

  const [loadingFavs, setLoadingFavs] = useState(true);

  useEffect(() => {
    JSONGamesUseCases.getFavsID().then(() => {
      setLoadingFavs(false);
    });
  }, []);

  useEffect(() => {
    GamesUseCases.getDiscoverGames(1, {
      param: "ordering",
      value: "released",
    }).finally(() => {
      carousel = document.getElementById("carousel");

      setdiscoverLoading(false);
    });
  }, [favorites]);
  useEffect(() => {
    let isDragging = false;
    let startX: number;

    let currentTranslateX = 0;
    let prevTranslateX = 0;

    const dragStart = (e: any) => {
      isDragging = true;
      startX = e.pageX;
      prevTranslateX = currentTranslateX; // Guarda la última posición al iniciar
    };

    const dragging = (e: any) => {
      if (!isDragging) return;
      const x = e.pageX - startX;
      currentTranslateX = prevTranslateX + x; // Invierte el signo para que el movimiento sea en la dirección correcta

      // Limitar la posición para que no se desplace demasiado hacia los extremos
      const maxTranslateX = 0;
      const minTranslateX = -(carousel!.scrollWidth - carousel!.offsetWidth);
      currentTranslateX = Math.max(
        minTranslateX,
        Math.min(maxTranslateX, currentTranslateX)
      );

      carousel!.style.transform = `translateX(${currentTranslateX}px)`;
    };

    const dragStop = () => {
      isDragging = false;
      carousel!.style.transition = "transform 0.1s ease-out"; // Agrega una transición suave
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

  const catalogGames = GlobalStateService.getGames();
  const discoverGames = GlobalStateService.getDiscoverGames();
  const catalogGamesPage = GlobalStateService.getGamesPage();

  const gamesItems = GlobalStateService.getItems();

  //const userOptions = GlobalStateService.getUserFilterOptions();
  const [discoverLoading, setdiscoverLoading] = useState(true);

  const [source, sourceState] = useState("api");
  const changeSource = (value: string) => {
    setFiltersOptionState(value);
    sourceState(value);
    refreshCatalog();
    if (value === "api") {
      GamesUseCases.getGames(
        catalogGamesPage,
        { param: "ordering", value: "Name" },
        genres?.join(","),
        platforms?.join(",")
      ).then(() => {});
    } else {
      JSONGamesUseCases.GetGames(
        catalogGamesPage,
        genres,
        platforms,
        "name"
      ).then(() => {});
    }
    hasMoreState(true);
  };
  const [filter, setFilterState] = useState("");
  const changeFilter = (value: string) => {
    setFilterState(value);
    refreshCatalog();
    if (source != "api") {
      JSONGamesUseCases.GetGames(1, genres, platforms, value);
    }
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
  const filtersJSON = [
    { value: "name", label: "Name" },
    { value: "released", label: "Release date" },
    { value: "rating", label: "Rating" },
  ];
  const [hasMore, hasMoreState] = useState(true);
  const refreshCatalog = () => {
    GlobalStateService.deleteGames();
    GlobalStateService.setGamesPage(1);
  };
  const refreshFilters = () => {};

  const Genres = GlobalStateService.getGenres();
  const Platforms = GlobalStateService.getPlatforms();
  useEffect(() => {
    refreshCatalog();
    refreshFilters();
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

  const [genres, genresState] = useState<number[]>();
  const [platforms, platformState] = useState<number[]>();

  const setUpGenres = (value: number[]) => {
    refreshCatalog();
    genresState(value);
    if (source != "api") {
      JSONGamesUseCases.GetGames(1, value, platforms);
    }
  };
  const setUpPlatforms = (value: number[]) => {
    refreshCatalog();
    platformState(value);
    if (source != "api") {
      JSONGamesUseCases.GetGames(1, genres, value);
    }
  };

  return (
    <>
      <h1 className={styles.title} style={{ paddingTop: "15px" }}>
        Discover new Games
      </h1>
      <div className={styles.discoverSection}>
        {discoverLoading && loadingFavs ? (
          <Spin style={{ margin: "20px" }} tip="Loading" size="large"></Spin>
        ) : (
          <>
            <div className={styles.carousel} id="carousel">
              {discoverGames.map((game) => {
                return (
                  <CardGameD
                    id={game.id}
                    source={game.source}
                    fav={favorites.includes(game.id) ? true : false}
                    title={game.title || "No info."}
                    imgSrc={game.image || "notfound.png"}
                    releaseDate={game.releaseDate || "No info."}
                    genre={game.genres.map((g) => g.name) || "No info."}
                    platforms={
                      game.platforms.map((p) => p.platform.name) || "No info."
                    }
                  />
                );
              })}
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
            defaultValue={"Updated"}
            maxTagCount={"responsive"}
            onChange={changeFilter}
            options={filtersOption == "api" ? filtersAPI : filtersJSON}
          />
          <Select
            defaultValue={"api"}
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
          style={{ overflow: "hidden" }}
          dataLength={catalogGames.length}
          next={() => {
            if (source == "api") {
              GamesUseCases.getGames(
                catalogGamesPage,
                {
                  param: "ordering",
                  value: filter ? filter : "Name",
                },
                genres?.join(","),
                platforms?.join(",")
              ).then(() => {
                GlobalStateService.setGamesPage(catalogGamesPage + 1);
              });
            } else {
              JSONGamesUseCases.GetGames(
                catalogGamesPage,
                genres,
                platforms,
                "name"
              ).then(() => {
                if (gamesItems <= catalogGames.length) {
                  hasMoreState(false);
                } else {
                  GlobalStateService.setGamesPage(catalogGamesPage + 1);
                }
              });
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
          <Row gutter={[16, 4]} justify="center" style={{ marginTop: "20px" }}>
            {catalogGames.map((game) => (
              <Col
                key={game.id}
                span={getColumnSpan()}
                className={styles.columnCatalog}
                style={{ flex: 0, zIndex: 1, maxHeight: "235px" }}
              >
                <CardGameD
                  id={game.id}
                  source={game.source}
                  title={game.title}
                  fav={favorites.includes(game.id) ? true : false}
                  imgSrc={game.image || "notfound.png"}
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
