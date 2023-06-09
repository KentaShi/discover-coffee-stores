const Airtable = require("airtable")
const base = new Airtable({
    apiKey: process.env.AIRTABLE_SECRET_API_TOKEN,
}).base(process.env.AIRTABLE_BASE_KEY)

const table = base("coffee-stores")

const getMinifiedRecord = (record) => {
    return {
        recordID: record.id,
        ...record.fields,
    }
}

const getMinifiedRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record))
}

const findRecordsByFilter = async (id) => {
    const findCoffeeStores = await table
        .select({
            filterByFormula: `id="${id}"`,
        })
        .firstPage()

    return getMinifiedRecords(findCoffeeStores)
}

export { table, getMinifiedRecords, findRecordsByFilter }
