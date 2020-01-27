import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class contList extends Component {

  state = {
    users: [],
    username: '',
    numero: ''
  }

  async componentDidMount(){
   this.getUsers();
  }


  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
   this.setState({users: res.data});
  }

  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onChangeUserNumber = (e) => {
    this.setState({
      numero: e.target.value
    })
  }
  
  onSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username,
      numero: this.state.numero
    })
    this.setState({username: ''});
    this.setState({numero: ''});
    this.getUsers();
  };

  render() {
    return (
      <div className="col-md-8 ct m-0 m-auto">
        <h1 className="text-center m-4">Contact List</h1>
          <ul className="list-group">
            {
              this.state.users.map(user => 
              (<li className="list-group-item list-group-item-action mb-1 d-flex justify-content-around" key= {user._id}>
                <span> <label>Name:</label> {user.username}</span> 
                <span><label>Number</label> {user.numero}</span>
                <Link className="btn btn-secondary" to={"/user/" + user._id}>Edit</Link>
              </li>)
              )
            }
          </ul>
        </div>
    )
  }
}