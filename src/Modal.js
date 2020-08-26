import React, { Component } from 'react'
import Upload from "./Upload"
import Dialog from '@material-ui/core/Dialog';


export default class Modal extends Component {

    state = {
        open: false,
        mountain_id: null,
        title: '',
        image: '',
        description: ''
    }

    handleClickOpen = () => {
        this.setState({open: true})
      };
    
    handleClose = (props) => {
        this.setState({open: false})
        const {title, image, description, mountain_id} = this.state
        const user_id = localStorage.getItem("user_id")
        const mountain_id_int = parseInt(mountain_id)
        this.props.postHike({title, image, description, user_id, mountain_id: mountain_id_int})
    }

    updateInput = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    addImage = (url) => {
        console.log(url)
        this.setState({image: url})
    }

    render() {
        return (
            <div className="modal">
                <button className="add-hike-button" onClick={this.handleClickOpen}>
                    ADD NEW HIKE
                </button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <h2 id="form-dialog-title">Add your hike!</h2>
                    <form className="add-hike-form">
                        <select name="mountain_id" onChange={this.updateInput} className="select-box">
                        <option className="option" disabled selected hidden>Select Fourteener</option>
                        {this.props.mountains.map(mountain => {
                            return <option className="option" key={mountain.id} value={mountain.id}>{mountain.name}</option>
                        })}
                        </select>
                        <input 
                            className="title-input"
                            value={this.state.title} 
                            name="title"
                            type="text" 
                            placeholder="Title" 
                            onChange={this.updateInput}
                        />
                        <Upload addImage={this.addImage} />
                        <textarea
                            className="description-input"
                            value={this.state.description} 
                            name="description" 
                            type="text" 
                            placeholder="Description"
                            onChange={this.updateInput}
                        />
                    </form>
                    <button className="submit-hike-button" onClick={this.handleClose} color="darkslategray" size="large">
                        Add Hike
                    </button>
                </Dialog>
            </div>
        )
    }
}
