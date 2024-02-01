import { useMap } from 'react-leaflet'

const MapMarkersComponent = ({ selectedCity }) => {
  const { latitude, longitude } = selectedCity
  const map = useMap()

  if (map && latitude !== undefined && longitude !== undefined) {
    map.flyTo([latitude, longitude], 15)
  }

  return null
}

export default MapMarkersComponent
