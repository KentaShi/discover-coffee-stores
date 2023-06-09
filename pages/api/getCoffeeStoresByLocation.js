import { fetchCoffeeStore } from "@/lib/coffee-store"

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query
        const response = await fetchCoffeeStore(latLong, limit)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default getCoffeeStoresByLocation
