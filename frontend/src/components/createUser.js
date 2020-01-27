import React, { Component } from 'react';
import axios from 'axios';

export default class createUser extends Component {
  
  state = {
    users: [],
    username: '',
    numero: '',
    editing: false,
    _id: ''
  }

  async componentDidMount(){
   this.getUsers();
   if (this.props.match.params.id){
    const res = await axios.get('http://localhost:4000/api/users/' + this.props.match.params.id);
      this.setState({
        username: res.data.username,
        numero: res.data.numero,
        editing: true,
        _id: this.props.match.params.id
      })
   }
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
    if (this.state.editing) {
      await axios.put('http://localhost:4000/api/users/' + this.state._id, {
        username: this.state.username,
        numero: this.state.numero
      });

      this.props.history.push('/user');
    }else{
      await axios.post('http://localhost:4000/api/users', {
        username: this.state.username,
        numero: this.state.numero
      })
    }
    this.setState({username: '', numero: '', editing: false });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete('http://localhost:4000/api/users/' + id);
    this.getUsers();
  }

  render() {
    return (
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crate New Contact</h3>
            <form onSubmit={this.onSubmit}>
              <div className="from-group">
                <input type="text" className="form-control mt-4"
                value ={this.state.username}
                onChange={this.onChangeUserName} placeholder="Contact Name"/>

                 <input type="text" className="form-control mt-4"
                value ={this.state.numero} 
                onChange={this.onChangeUserNumber} placeholder="Contact Number"/>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8 ct">
          <ul className="list-group">
            {
              this.state.users.map(user => 
              (<li className="list-group-item list-group-item-action mb-1 align-self-center d-flex justify-content-around" key= {user._id}>
                <span> <label>Name:</label> {user.username}</span> 
                <span><label>Number</label> {user.numero}</span>
                <button className="btn btn-danger" onClick={() => this.deleteUser(user._id)}>Delected</button>
              </li>)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}