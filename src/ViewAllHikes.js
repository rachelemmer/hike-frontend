import React, {Component} from 'react'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default class ViewAllHikes extends Component {
    
    state = {
        mountains: [],
        activeMountain: null
    }

    componentDidMount() {
        fetch('http://localhost:4000/mountain')
            .then(response => response.json())
            .then(result => this.setState({mountains: result.mountains}))
    }


    render() {
        return (
            <Map center={[39, -106]} zoom={8}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                {this.state.mountains.map(mountain => {
                    return <Marker key={mountain.id} name={mountain.name} position={[mountain.latitude, mountain.longitude]}
                        onClick={() => this.setState({activeMountain: mountain})}
                    />
                })}
                {this.state.activeMountain && (
                <Popup 
                    position={[this.state.activeMountain.latitude, this.state.activeMountain.longitude]} 
                    onClose={() => this.setState({activeMountain: null}) }
                    >
                    <div>
                        <h2>{this.state.activeMountain.name}</h2>
                    </div>
                </Popup>
                )}
                )}
            </Map>
        )
    }
}
