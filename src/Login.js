import React, { Component } from 'react'


export default class LogIn extends Component {

    state = {
        username: '',
        password: '',
    }

    componentDidMount(){
        localStorage.clear()
        this.props.setIsLoggedIn(false)
    }

    updateInput = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    logIn = event => {
        event.preventDefault()
        const {username, password} = this.state
        
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(result => {
            localStorage.setItem("token", result.token)
            localStorage.setItem("user_id", result.foundUser.id)
            this.props.setIsLoggedIn(true)
            if (result.token) {
                this.props.history.push("Dashboard")
            }
            else {
                alert("Wrong username or password! Please try again.")
            }
        })
            
        this.setState({
            username: '',
            password: ''
        })
        
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-form-container">
                    <h1 className="login-title">Log in and let's Hike</h1>
                    <form className="login-form" onSubmit={this.logIn}>
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
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}
