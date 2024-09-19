import { CheckCircleFilled, PlusCircleFilled } from "@ant-design/icons"
import { Card } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./index.module.scss"

interface CardComponent{
    id: number,
    title: string,
    imgSrc: string,
    releaseDate: string,
    genre: string[],
    platforms: string[]
}

export const CardGameD: React.FC<CardComponent>  = ({id, title, imgSrc, releaseDate, genre, platforms}) => {
    const [favState, setFavState] = useState(false)
    return (    
        <>
                <Card hoverable className={styles.gamecard} bordered={false} cover={<img draggable={false}  alt="Cover" src={imgSrc} />}>
                    <div className={styles.titleHoverContainer}>
                    <Link draggable={false} to={"/details/" + id} className={styles.titleHover}>{title}</Link> 
                        {favState ? <CheckCircleFilled className={styles.PlusHover}  onClick={() => {setFavState(false)}} /> : <PlusCircleFilled className={styles.PlusHover} onClick={() => {setFavState(true)}} /> }
                    </div>
                    <Card.Meta title={title} className={styles.title} />
                    <div className={styles.cardcontent}>
                        <p>Release date: {releaseDate}</p>
                        <p>Genre: {genre.join(", ")} </p>
                        <p>Platforms: {platforms.join(", ")}</p>
                    </div>
                </Card>
        </>
    )
}