import React, { Component } from 'react'
import Modal from "./Modal"
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default class Dashboard extends Component {

    state = {
        mountains: [],
        activeMountain: null,
        hikes: [],
        activeHike: null,
        hasHiked: []
    }

    handleLogout = (props) => {
        localStorage.clear()
        this.props.history.push("Login")
    }

    getMountains = () => {
        fetch('http://localhost:4000/mountain')
            .then(response => response.json())
            .then(result => this.setState({mountains: result.mountains}))
    }

    getHikes = () => {
        fetch("http://localhost:4000/hike", {
            method: "GET",
            headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => response.json())
            .then(result => this.setState({hikes: result.hikes}))
            .then(result =>
                result.hikes.forEach(hike => {
                    this.setState({hasHiked: [...this.state.hasHiked, hike.id]})
            })
            )
            .catch(error => console.error(error))
    }

    componentDidMount() {
        this.getMountains()
        this.getHikes()
    }


    render() {
        console.log("state has hiked", this.state.hasHiked)
        return (
            <div className="dashboard-page">
                <Modal mountains={this.state.mountains}/>
                <div>
                <Map id="dashboard-map" center={[39, -106]} zoom={8}>
                <button onClick={this.handleLogout} className="logout-button">LOG OUT</button>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                {this.state.mountains.map((mountain, i) => {
            let icon;
            if (this.state.hasHiked.includes(i)) {
                console.log("yes", i)
                // icon = greenIcon
            } else {
                console.log("not yet hiked")
                // icon = redIcon
            }
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
                </div>    
            </div>
        )
    }
}
