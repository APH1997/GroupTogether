import React, { useRef, useState, useContext } from "react";

const MarkerContext = React.createContext()

export function ModalProvider({ children }) {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    contextValue = {
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
