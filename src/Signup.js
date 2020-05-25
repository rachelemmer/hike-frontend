import React, { Component } from 'react'

export default class SignUp extends Component {

    state = {
        username: '',
        password: ''
    }


    updateInput = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    signUp = event => {
        event.preventDefault()

        const {username, password} = this.state
        
        fetch("http://localhost:4000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })
            .then(response => response.json())
            .then(alert("You have successfully signed up"))   
            
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="signup-container">
                <div className="signup-form-container">
                    <h1 className="signup-title">Create your Hike account</h1>
                    <form className="signup-form" onSubmit={this.signUp}>
                        <input 
                            value={this.state.username} 
                            name="username" 
                            type="text" 
                            placeholder="username"
                            onChange={this.updateInput}
                        />
                        <input 
                            value={this.state.password} 
                            name="password" 
                            type="password" 
                            placeholder="password"
                            onChange={this.updateInput}
                        />
                        <button type="submit">Sign Up</button>
                        <p className="account-question">Already have an account? <a href="./Login">Click here to log in</a></p>
                    </form>
                </div>
            </div>
        )
    }
}
