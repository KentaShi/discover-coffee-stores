import { ACTION_TYPES } from "./Actions"

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong }
        }
        case ACTION_TYPES.SET_COFFEE_STORE: {
            return { ...state, coffeeStores: action.payload.coffeeStores }
        }
        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}

export default reducer
