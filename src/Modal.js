import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    
    handleClose = () => {
        this.setState({open: false})
        const {title, image, description, mountain_id} = this.state
        const user_id = localStorage.getItem("user_id")
        const mountain_id_int = parseInt(mountain_id)
        console.log(user_id)
        console.log(mountain_id_int)
        
        fetch("http://localhost:4000/hike", {
            method: "POST",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body: JSON.stringify({title, image, description, mountain_id: mountain_id_int, user_id})
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    updateInput = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    

    render() {
        return (
            <div className="modal">
                <button className="add-hike-button" onClick={this.handleClickOpen}>
                    ADD NEW HIKE
                </button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add your hike!</DialogTitle>
                    <DialogContent>
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
                            <input 
                                className="image-input"
                                value={this.state.image} 
                                name="image" 
                                type="text" 
                                placeholder="Image URL"
                                onChange={this.updateInput}
                            />
                            <input 
                                className="description-input"
                                value={this.state.description} 
                                name="description" 
                                type="text" 
                                placeholder="Description"
                                onChange={this.updateInput}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Add Hike
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
