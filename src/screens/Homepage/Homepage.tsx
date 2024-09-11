    import styles from "./homepage.module.scss"
    import { CardGameD } from "../../components/CardGameDefault/CardGameDefault"
    import { Col, Flex, Grid, Row } from "antd"
    export function Homepage(){
        return(
            <>
                <h1 className={styles.title}>Discover new Games</h1> 
                <div className="discover-section">
                <Flex justify={"center"} >
                <Row justify="space-evenly">
                    
                    <CardGameD/>
                    <CardGameD/>
                    <CardGameD/>
                    <CardGameD/>
                    
                </Row>
                </Flex>
                </div>
                <h1 className={styles.title}>Catalog</h1>
            </>
        )
    }