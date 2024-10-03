import styles from "./EditGame.module.scss";
import { Form } from "antd";
import { useFormik } from "formik";
import {
  Button,
  Input,
  DatePicker,
  Upload,
  Select,
  Rate,
  Row,
  Col,
} from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

export function EditGame() {
  type IForm = {
    gameTitle?: string;
    description?: string;
    releaseDate?: string;
    starRating?: number;
    img?: string;
    tags?: string[];
  };
  const formik = useFormik<IForm>({
    initialValues: {
      gameTitle: "",
      description: "",
      releaseDate: "",
      starRating: 0,
      img: "",
      tags: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100vw", height: "100vh", alignItems: "stretch" }}
      >
        <Form
          onFinish={formik.submitForm}
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
                options={options}
              />
            </div>
          </Col>
          <Col>
            <div className={styles.gameInfo} style={{}}>
              <Form.Item<IForm>
                label="Game Title"
                name="gameTitle"
                layout="vertical"
                rules={[{ required: true, message: "Insert a game title." }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<IForm>
                label="Description"
                name="description"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game description." },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item<IForm>
                label="Release date"
                name="releaseDate"
                layout="vertical"
                rules={[
                  { required: true, message: "Insert a game release date." },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item<IForm>
                label="Star rating"
                name="starRating"
                layout="vertical"
                rules={[{ required: true, message: "Select a star rating." }]}
              >
                <Rate allowHalf />
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
