import styles from "./Gamedetails.module.scss"

interface gameDetailInterface{
    id: number,
    title: string,
    imgSrc: string,
    about: string,
    releaseDate: string,
    rating: number,
    genre: string[],
    platforms: string[],
    tags: string[],
    requirements: string
}

export const GameDetails: React.FC<gameDetailInterface> = ({about, genre,imgSrc, platforms, rating, releaseDate, requirements, tags,title }) => {
    return (
        <>
            <div className={styles.gameDetails}>
                <h1>{title}</h1>
                <div className={styles.detailContainer}>
                    <div className={styles.imgCover}><img src={imgSrc} alt="Cover" /></div>
                    <div className={styles.aboutSection}>
                        <h2>About</h2>
                        <p>{about}</p>

                        <p>
                            Rating: {rating}
                        </p>
                        <p>Platforms: {platforms.join(", ")}</p>
                        <p>Buy at: </p>
                        <p>Genre: {genre.join(", ")}</p>
                        <p>Release date: {releaseDate} </p>
                    </div>
                </div>

                <div className={styles.moreInformation}>
                    <div className={styles.tags}> 
                    <h3>Tags</h3>
                    <p>
                    {tags.join(", ")}
                    </p>
                    </div>
                    <div className={styles.requirements}>
                    <h3> System requirements for PC</h3>
                    <p>
                    {requirements}
                    </p>
                    </div>  
                </div>
            </div>
        </>
    )
}