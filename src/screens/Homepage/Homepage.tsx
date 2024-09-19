import { useEffect } from "react";
import { CardGameD } from "../../components/CardGameDefault/CardGameDefault";
import styles from "./homepage.module.scss";


export function Homepage() {
    useEffect(() => {
        const carousel = document.getElementById("carousel");
        let isDragging = false
        let startX: number
        let startScrollLeft: number;
        const dragStart = (e: any) => {
            isDragging = true;
            carousel?.classList.add("dragging")
            startX = e.pageX
            startScrollLeft = carousel.scrollLeft
        }
        const dragging = (e: any) => {
            console.log(startScrollLeft)
            if (!isDragging) return;
            const x = e.pageX - startX;
            carousel.scrollLeft = startScrollLeft - x
        }
        const dragStop = () => {
            isDragging = false;
            carousel?.classList.remove("dragging");

        }
        carousel?.addEventListener("mousemove", dragging)
        carousel?.addEventListener("mousedown", dragStart)
        carousel?.addEventListener("mouseup", dragStop)
        carousel?.addEventListener("mouseleave", dragStop);
        return () => {
            const carousel = document.getElementById("carousel");
            carousel?.removeEventListener("mousemove", dragging)
            carousel?.removeEventListener("mousedown", dragStart)
            carousel?.removeEventListener("mouseup", dragStop)
            carousel?.removeEventListener("mouseleave", dragStop);
        }
    }, [])


    return (
        <>

            <h1 className={styles.title}>Discover new Games</h1>
            <div className={styles.discoverSection} >
                <div className={styles.container}>
                    <div className={styles.carousel} id="carousel">
                        <CardGameD id={1} title={"The Legend of Zelda Twilight Princess"} imgSrc="TLOZ.jpg" releaseDate="11-9-2006" genre={["Action", "Fantasy"]} platforms={["Wii U", "Gamecube"]} />
                        <CardGameD id={2} title={"Shadow the Hedgehog"} imgSrc="shadow.jpg" releaseDate="11-11-2005" genre={["Action"]} platforms={["Gamecube", "Xbox", "PS3", "PS2"]} />
                        <CardGameD id={3} title={"Portal 2"} imgSrc="portal.jpg" releaseDate="18-4-2011" genre={["Puzzle", "Shooter"]} platforms={["PC", "Xbox360", "PS3"]} />
                        <CardGameD id={4} title={"BioShock"} imgSrc="bioshock.png" releaseDate="21-8-2007" genre={["Action", "Shooter"]} platforms={["PC", "Xbox360", "PS3"]} />
                        <CardGameD id={5} title={"Metal Gear Rising: Revengeance"} imgSrc="mgr.jpeg" releaseDate="19-2-2013" genre={["Action"]} platforms={["PS3", "Xbox360", "PC"]} />
                    </div>
                </div>
    
            </div>

        </>
    )
}


