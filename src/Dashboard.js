import React, { Component } from 'react'
import Modal from "./Modal"
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default class Dashboard extends Component {

    state = {
        mountains: [],
        activeMountain: null,
        hikes: [],
        activeHike: null
    }

    postHike = (hikeData) => {
        console.log(hikeData)
        fetch("http://localhost:4000/hike", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: JSON.stringify(hikeData)
        })
        .then(response => response.json())
        .then(hike => this.setState({hikes: [...this.state.hikes, hike]}))
        .catch(error => console.log('error', error));
        this.getHikes()
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
            .catch(error => console.error(error))
    }

    componentDidMount() {
        this.getMountains()
        this.getHikes()
    }

    render() {
        return (
            <div className="dashboard-page">
                <Modal postHike={this.postHike} mountains={this.state.mountains}/>
                <div>
                <Map id="dashboard-map" center={[39, -106]} zoom={8}>
                <button onClick={this.handleLogout} className="logout-button">LOG OUT</button>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                {this.state.hikes.map(hike => {
                    return <Marker key={hike.id} position={[hike.mountains.latitude, hike.mountains.longitude]}
                        onClick={() => this.setState({activeHike: hike})}
                    />
                })}
                 
                {this.state.activeHike && (
                <Popup 
                    position={[this.state.activeHike.mountains.latitude, this.state.activeHike.mountains.longitude]} 
                    onClose={() => this.setState({activeHike: null}) }
                        >
                        <div>
                            <h1>{this.state.activeHike.title}</h1>
                            <h3>{this.state.activeHike.mountains.name}</h3>
                            <p>{this.state.activeHike.description}</p>
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
