import { table, getMinifiedRecords, findRecordsByFilter } from "@/lib/airtable"

export default async (req, res) => {
    if (req.method === "PUT") {
        await favouriteCoffeeStoreById(req, res)
    } else {
        res.status(500).json({ error: "Wrong method" })
    }
}

const favouriteCoffeeStoreById = async (req, res) => {
    try {
        const { id } = req.body
        if (id) {
            const records = await findRecordsByFilter(id)
            if (records.length > 0) {
                const record = records[0]
                const calculateVoting = parseInt(record.voting) + 1

                //update record
                const updateRecord = await table.update([
                    {
                        id: record.recordID,
                        fields: {
                            voting: calculateVoting,
                        },
                    },
                ])
                const minifiedRecord = await getMinifiedRecords(updateRecord)

                res.status(200).json(minifiedRecord)
            } else {
                res.status(404).json({ message: "Id is not a valid" })
            }
        } else {
            res.status(404).json({ message: "Id is missing" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
