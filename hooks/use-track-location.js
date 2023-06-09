import { ACTION_TYPES } from "@/store/Actions"
import { DataContext } from "@/store/GlobalState"
import { useContext, useState } from "react"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("")

    const [isFindingLocation, setIsFindingLocation] = useState(false)

    const { state, dispatch } = useContext(DataContext)

    const success = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        // setLatLong(`${latitude},${longitude}`)
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: { latLong: `${latitude},${longitude}` },
        })
        setLocationErrorMsg("")
        setIsFindingLocation(false)
    }
    const error = () => {
        setIsFindingLocation(false)
        setLocationErrorMsg("Unable to retrieve your location")
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true)
        if (!navigator.geolocation) {
            setIsFindingLocation(false)
            setLocationErrorMsg("Geolocation is not supported by your browser")
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }

    return {
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation,
    }
}

export default useTrackLocation
