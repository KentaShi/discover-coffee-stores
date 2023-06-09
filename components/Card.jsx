import Image from "next/image"
import Link from "next/link"
import React from "react"
import styles from "../styles/Card.module.css"
import cls from "classnames"

const Card = (props) => {
    return (
        <Link className={styles.cardLink} href={props.href}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{props.name}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image
                        alt={props.name}
                        className={styles.cardImage}
                        src={props.imgUrl}
                        width={260}
                        height={160}
                    />
                </div>
            </div>
        </Link>
    )
}

export default Card
