import React, { Component } from 'react'
import { storage } from "./Firebase"


export default class Upload extends Component {

    state = {
        image: {},
        url: '',
        isUrl: false,
    }

    handleFileInput = (event) => {
        console.log(event)
        console.log(event.target.files[0])
        this.setState({
            image: event.target.files[0]
        })
    }

    handleUpload = (event) => {
        event.preventDefault()
        const {image} = this.state
        this.setState({isLoaded: false})
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
           "state_changed",
           snapshot => {},
           error => {
               console.log(error);
           },
           () => {
               storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then(url => {
                   this.setState({url: url, isUrl: true, isLoaded: true})
                   this.props.addImage(this.state.url)
               })
          }
        )
        
    }

    render() {
        return (
            <div>
                <input id="choose-file" type='file' name='image'
                    onChange={this.handleFileInput}
                /> 
                <button className="upload-image-button" onClick={this.handleUpload}>Upload</button>
            </div>
                
            
        )
    }
}
