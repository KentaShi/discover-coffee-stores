import { createApi } from "unsplash-js"

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfPhotosForCoffeeStores = async () => {
    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        perPage: 40,
    })
    const unsplashResults = photos.response.results
    return unsplashResults.map((result) => result.urls["small"])
}

export const fetchCoffeeStore = async (
    latLong = "11.313695318703667%2C106.09663707971849",
    limit = 30
) => {
    const photos = await getListOfPhotosForCoffeeStores()

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.FOURSQUARE_API_KEY,
        },
    }

    const response = await fetch(
        getUrlForCoffeeStores(latLong, "coffee shop", limit),
        options
    )
    const data = await response.json()
    return data?.results.map((result, index) => {
        const neighborhood = result.location.neighborhood
        return {
            id: result.fsq_id,
            name: result.name,
            address: result.location.formatted_address,
            neighborhood:
                neighborhood?.length > 0
                    ? neighborhood[0]
                    : result.location.formatted_address,
            imgUrl: photos?.length > 0 ? photos[index] : null,
        }
    })
}
