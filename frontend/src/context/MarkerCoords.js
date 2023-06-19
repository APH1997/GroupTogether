import React, { useRef, useState, useContext } from "react";

const MarkerContext = React.createContext()

export function MarkerProvider({ children }) {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    let contextValue = {
        lat,
        setLat,
        lng,
        setLng
    }

    return (
        <MarkerContext.Provider value={contextValue}>
            {children}
        </MarkerContext.Provider>

    )
}

export const useMarker = () => useContext(MarkerContext)
