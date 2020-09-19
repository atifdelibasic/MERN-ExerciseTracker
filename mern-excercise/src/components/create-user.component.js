import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:''        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username.toLowerCase()
        };

        axios.post('http://localhost:5000/users/add', user)
        .then(() => this.setState({ username: ''}))
        .catch( err => console.error(err));
    }

    render() {
        return(
          <div>
          <h3>Create New User</h3>
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text"
                        className="form-control"
                        onChange={this.onChangeUsername}
                        value = {this.state.username}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Create User" minLength="3" maxLength="18"/>
                </div>
              </form>
          </div>
        )
    }
}