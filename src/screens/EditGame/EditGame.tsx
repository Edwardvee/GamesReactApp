import { FileImageOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Rate,
  Row,
  Select,
  Upload,
  Alert,
  message,
} from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { GlobalStateService } from "../../services/globalStateService";
import { UploadFile } from "antd/es/upload/interface";

import {
  IFormData,
  IGameDetail,
  IGenres,
  IPlatform,
  IPlatforms,
  IScreenshot,
  ITags,
} from "../../types";
import { Link, useLocation, useParams } from "react-router-dom";

import { GamesUseCases } from "../../useCases/gamesUseCases";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";
import { cloudinary } from "../../services/api/cloudinaryService";
import styles from "./EditGame.module.scss";
import dayjs from "dayjs";

export function EditGame() {
  const { id } = useParams();
  const location = useLocation();
  const source = new URLSearchParams(location.search).get("source");
  const game = GlobalStateService.getGameInfo()[0];
  useEffect(() => {
    if (id) {
      if (source == "api") {
        GamesUseCases.getGameInfo(id);
      } else if (source == "json") {
        JSONGamesUseCases.GameInfo(id);
      }
    }
  }, [id, source]);
  dayjs.locale("");
  const Genres = GlobalStateService.getGenres();
  const Platforms = GlobalStateService.getPlatforms();
  const Tags = GlobalStateService.getTags();
  useEffect(() => {
    GamesUseCases.getGenres();
    GamesUseCases.getTags();
    GamesUseCases.getPlatforms();
  }, []);
  const [initialValues, setInitialValues] = useState<IFormData>({
    id: "",
    title: "",
    about: "",
    releaseDate: "",
    rating: 0,
    backgroundImage: "",
    screenshots: [],
    tags: [],
    genres: [],
    platforms: [],
    source: "json",
  });
  useEffect(() => {
    if (game && !formik.values.title) {
      setInitialValues({
        ...game,
        title: game.title,
        releaseDate: game.releaseDate,
        tags: game.tags.map((tag: ITags) => {
          return tag.id;
        }),
        genres: game.genres.map((genre: IGenres) => {
          return genre.id;
        }),
        platforms: game.platforms.map((platform: IPlatforms) => {
          return platform.platform.id;
        }),
        backgroundImage: game.backgroundImage,
        screenshots: game.screenshots?.map((s: IScreenshot) => {
          return s.image;
        }),
        source: "json",
      });
    }
  }, [game]);

  const formik = useFormik<IFormData>({
    initialValues: initialValues,
    enableReinitialize: true,

    onSubmit: (values) => {
      JSONGamesUseCases.createGame(values);
      message.success("Game added successfully!");
      alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    console.warn(formik.values);
  }, [formik.values]);
  const optionsGenres: SelectProps["options"] = Genres.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const optionsTags: SelectProps["options"] = Tags.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const optionsPlatforms: SelectProps["options"] = Platforms.map((p) => ({
    label: p.name,
    value: p.id,
  }));
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    // Establecer el fileList inicial con los valores de Formik
    const initialFileList: UploadFile[] = [
      ...(formik.values.backgroundImage
        ? [
            {
              uid: "existing_background_image",
              name: "backgroundImage.png",
              status: "done" as UploadFile["status"], // Asegúrate de que el tipo sea correcto
              url: formik.values.backgroundImage,
              response: { secure_url: formik.values.backgroundImage }, // Esto es necesario para que funcione con Upload
            },
          ]
        : []),
      ...(formik.values.screenshots?.map((url, index) => ({
        uid: `screenshot_${index}`,
        name: `screenshot_${index}.png`,
        status: "done" as UploadFile["status"],
        url: url, // Asegúrate de que esta propiedad esté presente
        response: { secure_url: url }, // Necesario para que funcione con Upload
      })) || []),
    ];

    setFileList(initialFileList);
  }, [formik.values.backgroundImage, formik.values.screenshots]);

  const [isFirstImage, setIsFirstImage] = useState(true);

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Form
          onFinish={(e) => {
            formik.handleSubmit();
          }}
          variant="filled"
          layout="inline"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Col>
            <div className={styles.img}>
              <Form.Item
                label=""
                valuePropName="img"
                layout="vertical"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Upload
                  name="backgroundImage"
                  action={`https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/image/upload`}
                  data={() => ({
                    upload_preset:
                      fileList.length === 0
                        ? "gamesApp"
                        : "gamesAppScreenshots",
                  })}
                  listType="picture-card"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  fileList={fileList}
                  onChange={(info) => {
                    const { fileList: newFileList } = info;
                    if (info.file.status == "done") {
                      if (info.file.response) {
                        const updatedFile = {
                          uid: info.file.uid,
                          name: info.file.name,
                          status: "done" as UploadFile["status"],
                          url: info.file.response.url,
                          response: { url: info.file },
                        };
                        console.log(updatedFile);
                        setFileList([...fileList, updatedFile]);
                      }
                      const allScreenshots = newFileList
                        .filter(
                          (file) =>
                            file.uid !== "existing_background_image" &&
                            file.status === "done"
                        )
                        .map((file) => file.response.secure_url);
                      formik.setFieldValue("screenshots", allScreenshots);

                      const backgroundImage = newFileList.find(
                        (file) => file.uid === "existing_background_image"
                      );
                      if (backgroundImage) {
                        formik.setFieldValue(
                          "backgroundImage",
                          backgroundImage.response
                        );
                      }
                    } else if (info.file.status === "error") {
                      console.error(
                        "Error al cargar el archivo:",
                        info.file.response
                      );
                    }
                  }}
                  onRemove={(file) => {
                    const updatedFileList = fileList.filter(
                      (item) => item.uid !== file.uid
                    );
                    setFileList(updatedFileList);
                    const allScreenshots = updatedFileList
                      .filter(
                        (item) =>
                          item.uid !== "existing_background_image" &&
                          item.status === "done"
                      )
                      .map((item) => item.response.secure_url);

                    formik.setFieldValue("screenshots", allScreenshots);
                    if (file.uid === "existing_background_image") {
                      formik.setFieldValue("backgroundImage", "");
                    }
                  }}
                >
                  <button
                    style={{
                      border: 0,
                      width: "100%",
                      height: "100%",
                      background: "none",
                      textAlign: "center",
                    }}
                    type="button"
                  >
                    <FileImageOutlined />
                    <div style={{ marginTop: 8 }}>
                      Upload your game pictures
                    </div>
                  </button>
                </Upload>
              </Form.Item>
            </div>
            <div className={styles.tags}>
              <p>Select your tags</p>
              <Select
                mode="multiple"
                allowClear
                virtual={true}
                style={{ width: "100%" }}
                placeholder="Please select"
                options={optionsTags}
                value={formik.values.tags}
                maxTagCount={"responsive"}
                onChange={(value) => formik.setFieldValue("tags", value)}
              />
            </div>
          </Col>
          <Col>
            <div className={styles.gameInfo} style={{}}>
              <Form.Item<IFormData>
                label="Game Title"
                layout="vertical"
                rules={[{ required: true, message: "Insert a game title." }]}
              >
                <Input
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="About"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game description." },
                ]}
              >
                <Input.TextArea
                  name="about"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="Release date"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game release date." },
                ]}
              >
                <DatePicker
                  name="releaseDate"
                  value={dayjs(formik.values.releaseDate)}
                  onChange={(value) => {
                    const selectedDate = value
                      ? dayjs(value).format("YYYY-MM-DD")
                      : null;
                    formik.setFieldValue("releaseDate", selectedDate);
                  }}
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="Star rating"
                layout="vertical"
                rules={[{ required: true, message: "Select a star rating." }]}
              >
                <Rate
                  allowHalf
                  value={formik.values.rating}
                  onChange={(value) => formik.setFieldValue("rating", value)}
                />
              </Form.Item>
              <Form.Item
                label="Genres"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert at least one genre." },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={optionsGenres}
                  value={formik.values.genres}
                  maxTagCount={"responsive"}
                  optionFilterProp="label"
                  onChange={(value) => formik.setFieldValue("genres", value)}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Platforms"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert at least one platform." },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  options={optionsPlatforms}
                  maxTagCount={"responsive"}
                  value={formik.values.platforms}
                  optionFilterProp="label"
                  onChange={(value) => formik.setFieldValue("platforms", value)}
                ></Select>
              </Form.Item>
              <Form.Item style={{ marginTop: "250px" }}>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Form>
      </Row>
    </>
  );
}
