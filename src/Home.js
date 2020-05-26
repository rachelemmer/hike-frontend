import React from 'react'
import MountainVideo from "./mountain.mp4"

export default function Home() {
    return (
        <div>
            <div className="video-container">
                <video className="mountain-video" src={MountainVideo} autoPlay="autoplay" loop="loop" muted/> 
            </div>
            <div className="title-container">
                <h1 className="title">HIKE</h1>
                <a className="click-to-start" href="./signup">CLICK TO START</a>
            </div>
        </div>
    )
}
