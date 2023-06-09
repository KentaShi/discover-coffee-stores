import { createContext, useReducer } from "react"
import reducer from "./StoreReducer"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initState = {
        latLong: "",
        coffeeStores: [],
    }
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}
