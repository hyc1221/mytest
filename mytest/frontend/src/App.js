import React, { Component } from 'react';
import './App.css';
import NavComponent from './Components/NavComponent';
import jwt_decode from 'jwt-decode';

const base_url = window.SERVER_ADDRESS

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			logged_in: this.check_token(),
			username: '',
			displayed_form : '',
			user_id : ''
		}
	}

	componentDidMount(){
		if (this.state.logged_in) {
			fetch("social/profile/" + jwt_decode(localStorage.getItem('access')).user_id, {
				method : 'GET',
				headers : {
					Authorization : `Bearer ${localStorage.getItem('access')}`
				}
			})
			.then(res => res.json())
			.then(resp => {
				console.log(resp);
				this.setState({username : resp.user })
			})
			.catch(err => console.log(err));
		}
	}

	check_token() {
		if (localStorage.getItem('access')) {
			this.refresh_token();
			return true;
		}
		else return false;
	}

	refresh_token() {
		let data = {refresh : localStorage.getItem('refresh')};
		fetch('auth/jwt/refresh/', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			localStorage.setItem('access', json.access);
			console.log("token refreshed");
		})
		.catch(error => {
			console.log(error)
		})
	}

	display_form = (formName) => {
		this.setState({
			displayed_form : formName
		});
	}

	handleLoginChange = event => {
		this.setState({
			[event.target.name] : event.target.value
		})
	}

	handleLogout = () => {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		this.setState({logged_in : false, username : ''})
	}

	handleLogin = (e, data) => {
		e.preventDefault();
		console.log(data)
		fetch('auth/jwt/create/', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			localStorage.setItem('access', json.access);
			localStorage.setItem('refresh', json.refresh);
			this.setState({
				logged_in : true,
				username : data.username,
				user_id : jwt_decode(json.access).user_id
			})
			console.log("user id : " + jwt_decode(json.access).user_id);
		})
		.catch(error => {
			console.log(error)
		})
		this.setState({
			displayed_form : ''
		})
	}

	render() {
		const { logged_in, username, displayed_form } = this.state;
		return (
			<div>
				<NavComponent
				logged_in = {logged_in}
				handleLogin = {this.handleLogin}
				handleLoginChange = {this.handleLoginChange}
				handleLogout = {this.handleLogout}
				username = {username}
				displayed_form = {displayed_form}
				display_form = {this.display_form}
				/>
				<h3>{
					this.state.logged_in
					? `Hello ${this.state.username}`
					: 'Please log in'
				}</h3>
			</div>

		)
	}
}

export default App;