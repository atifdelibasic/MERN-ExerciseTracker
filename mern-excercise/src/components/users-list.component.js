import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import ModalComponent from './modal-component'

const User = props => {
    const remove = (id) => {
        props.removeUser(id);
    }
    return(
        <tr>
            <td >{ props.user.username }</td>
            <td  style={{ display:"flex" }}>
                <Link to={"/user/edit/" + props.user._id}><input type="button" className="btn btn-success" value="Edit"/></Link>
                <ModalComponent _id={ props.user._id } remove={ remove }/>
            </td>
        </tr>
    );
}

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users:[]
        }

        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        let res = await axios.get('http://localhost:5000/users');
        let { data } = res;
        this.setState({ users: data? data:[] });
    }

    removeUser(id) {
        axios.delete('http://localhost:5000/users/' + id)
        .then(() => {
            this.setState({
                users: this.state.users.filter(user => user._id !== id )
            });
        });
    }

    displayUsers() {
        const { users } = this.state;
        if(users.length) {
            return users.map( user => <User removeUser={this.removeUser} key={user._id} user={user}/>)
        } else {
            return <tr><td>No users to show.</td></tr>
        }
    }

    render() {
        return (
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th  scope="col">Username</th>
                    <th scope="col">Options</th>
                </tr>
                </thead>
                <tbody>
                    { this.displayUsers() }
                </tbody>
            </table>
        )
    }
}
