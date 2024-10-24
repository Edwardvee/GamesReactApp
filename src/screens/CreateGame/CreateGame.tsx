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
import { useEffect } from "react";
import { GlobalStateService } from "../../services/globalStateService";
import { IFormData } from "../../types";
import { GamesUseCases } from "../../useCases/gamesUseCases";
import { JSONGamesUseCases } from "../../useCases/JSONGamesUseCases";
import styles from "./createGame.module.scss";

export function CreateGame() {
  const Genres = GlobalStateService.getGenres();
  const Platforms = GlobalStateService.getPlatforms();
  useEffect(() => {
    GamesUseCases.getGenres();
    GamesUseCases.getPlatforms();
  }, []);

  const formik = useFormik<IFormData>({
    initialValues: {
      id: "",
      title: "",
      about: "",
      releaseDate: "",
      rating: 0,
      backgroundImage: "",
      tags: [],
      genres: [],
      platforms: [],
      source: "json",
    },
    onSubmit: (values) => {
      JSONGamesUseCases.createGame(values);
      message.success("Game added successfully!");

      formik.resetForm();
    },
  });
  useEffect(() => {
    console.log(formik.values.tags);
  }, [formik.values]);
  const optionsGenres: SelectProps["options"] = Genres.map((g) => ({
    label: g.name,
    value: g.id,
  }));
  const optionsPlatforms: SelectProps["options"] = Platforms.map((p) => ({
    label: p.name,
    value: p.id,
  }));

  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <Form
          onFinish={formik.handleSubmit}
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
                  action="/upload.do"
                  listType="picture-card"
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center",
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
                style={{ width: "100%" }}
                placeholder="Please select"
                options={optionsGenres}
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
                name="title"
                layout="vertical"
                rules={[{ required: true, message: "Insert a game title." }]}
              >
                <Input
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="About"
                name="about"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game description." },
                ]}
              >
                <Input.TextArea
                  value={formik.values.about}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="Release date"
                name="releaseDate"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game release date." },
                ]}
              >
                <DatePicker
                  value={formik.values.releaseDate}
                  onChange={(value) =>
                    formik.setFieldValue("releaseDate", value)
                  }
                />
              </Form.Item>
              <Form.Item<IFormData>
                label="Star rating"
                name="rating"
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
                name="genres"
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
                  optionFilterProp="label"
                  onChange={(value) => formik.setFieldValue("genres", value)}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Platforms"
                name="platforms"
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
