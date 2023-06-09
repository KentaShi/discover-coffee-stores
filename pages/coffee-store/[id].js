import Head from "next/head"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

import Link from "next/link"
import styles from "../../styles/Coffee-store.module.css"
import Image from "next/image"
import cls from "classnames"
import { fetchCoffeeStore } from "@/lib/coffee-store"
import { DataContext } from "@/store/GlobalState"
import { isEmpty, fetcher } from "@/utils"
import useSWR from "swr"

const CoffeeStore = (props) => {
    const router = useRouter()

    const id = router.query.id

    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore || {})

    const { state, dispatch } = useContext(DataContext)
    const { coffeeStores } = state

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, address, neighborhood, voting, imgUrl } =
                coffeeStore

            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    name,
                    address: address || "",
                    neighborhood: neighborhood || "",
                    voting: voting || 0,
                    imgUrl,
                }),
            })
            const dbCoffeeStore = await response.json()
        } catch (error) {
            console.log("Error creating coffee store", error)
        }
    }

    useEffect(() => {
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find(
                    (store) => store.id === id
                )
                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext)
                    handleCreateCoffeeStore(coffeeStoreFromContext)
                }
            }
        } else {
            handleCreateCoffeeStore(props.coffeeStore)
        }
    }, [id])

    const {
        name = "",
        address = "",
        neighborhood = "",
        imgUrl = "",
    } = coffeeStore

    const [votingCount, setVotingCount] = useState(0)
    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

    useEffect(() => {
        if (data && data.length > 0) {
            setCoffeeStore(data[0])
            setVotingCount(data[0].voting)
        }
        if (error) {
            console.log("dataSwR error:", error)
        }
    }, [data])

    const handleUpvoteBtn = async () => {
        try {
            const response = await fetch("/api/favouriteCoffeeStoreById", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                }),
            })
            const dbCoffeeStore = await response.json()
            if (dbCoffeeStore && dbCoffeeStore.length > 0) {
                let count = votingCount + 1
                setVotingCount(count)
            }
        } catch (error) {
            console.log("Error upvoting the coffee store", error)
        }
    }
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Someting went wrong while retrieving data</div>
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href={"/"}>Go home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <div className={styles.storeImgWrapper}>
                        <Image
                            src={imgUrl}
                            width={600}
                            height={360}
                            className={styles.storeImg}
                            alt={name || address}
                        />
                    </div>
                </div>
                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            alt='icon-place'
                            src='/static/icons/place.svg'
                            width={24}
                            height={24}
                        />
                        <p>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            alt='icon-nearme'
                            src='/static/icons/nearMe.svg'
                            width={24}
                            height={24}
                        />
                        <p>{neighborhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            alt='icon-star'
                            src='/static/icons/star.svg'
                            width={24}
                            height={24}
                        />
                        <p>{votingCount}</p>
                    </div>
                    <button
                        className={styles.upvoteBtn}
                        onClick={handleUpvoteBtn}
                    >
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    )
}
export async function getStaticProps({ params: { id } }) {
    const coffeeStores = await fetchCoffeeStore()
    const findCoffeeStoreById = coffeeStores.find((store) => store.id === id)
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    }
}
export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStore()
    const paths = coffeeStores.map((item) => ({
        params: { id: item.id },
    }))
    return {
        paths,
        fallback: true,
    }
}

export default CoffeeStore
