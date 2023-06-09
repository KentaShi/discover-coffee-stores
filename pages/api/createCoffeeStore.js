import { table, getMinifiedRecords, findRecordsByFilter } from "@/lib/airtable"

export default async (req, res) => {
    if (req.method === "POST") {
        await createCoffeeStore(req, res)
    } else {
        res.status(500).json({ error: "Wrong method" })
    }
}

const createCoffeeStore = async (req, res) => {
    try {
        const { id, name, address, neighborhood, voting, imgUrl } = req.body
        //find a record
        if (id) {
            const records = await findRecordsByFilter(id)
            if (records.length > 0) {
                res.json(records)
            } else {
                //create a new record
                if (name) {
                    const createRecord = await table.create([
                        {
                            fields: {
                                id,
                                name,
                                address,
                                neighborhood,
                                voting,
                                imgUrl,
                            },
                        },
                    ])
                    const record = getMinifiedRecords(createRecord)
                    res.status(200).json(record)
                } else {
                    res.status(400).json({ message: "name is missing" })
                }
            }
        } else {
            res.status(400).json({ message: "id is missing" })
        }
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
