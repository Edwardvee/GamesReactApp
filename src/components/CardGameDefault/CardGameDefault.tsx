import { Flex, Grid, Card, Col } from "antd"
import styles from "./index.module.scss"
export function CardGameD(){
    return(
        <>
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card title="Titulo" className={styles.gamecard}>
        </Card>
        </Col>
        </>
    )
}