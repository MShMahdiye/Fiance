import React, { useMemo } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import './component_css/MapComponent.css'

function MapComponent({ setPropsPosition }) {

  function MyComponent() {
    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        console.log("map bounds", e.target.getBounds());
        setPropsPosition(e.target.getCenter())
      }
    });
    return null;
  }

  const displayMap = useMemo(
    () => (
      <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={10} scrollWheelZoom={false}>
        <MyComponent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      )
    ,
    [],
  )

  return (
    <div>
      <div>
        <div className='absolute-marker'><img width={'35px'} height={'35px'} src={require("../assets/venue_location_icon.svg").default} /></div>
        {
          displayMap
        }
      </div>
    </div>
  )
}

export default MapComponent