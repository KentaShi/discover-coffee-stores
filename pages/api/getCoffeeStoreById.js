import { findRecordsByFilter, getMinifiedRecords, table } from "@/lib/airtable"

export default async (req, res) => {
    if (req.method === "GET") {
        await getCoffeeStoreById(req, res)
    } else {
        res.status(404).json({ error: "Wrong request method" })
    }
}

const getCoffeeStoreById = async (req, res) => {
    try {
        const { id } = req.query
        if (id) {
            const records = await findRecordsByFilter(id)
            if (records.length > 0) {
                res.status(200).json(records)
            } else {
                res.status(404).json({ error: "Id not found" })
            }
        } else {
            res.status(404).json({ error: "Id is missing" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
