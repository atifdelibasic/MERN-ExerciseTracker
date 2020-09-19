import React, {Component} from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.props.match.params.id)
        .then( response => {
            this.setState({
                username:response.data.username,
            })
        });
    }

    onChange(e) {
        this.setState( {
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        
        axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
        .then((res) => { console.log('Uspjesno!') })
        
        window.location ='/users';
    }

    
    render() {
        return(
           <div>
               <h3>Edit User Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username:</label>
                       <input type="text" value={this.state.username} onChange={this.onChange} name="username"/>
                   </div>

                   <div className="form-group">
                       <input type="submit" value="Edit User Log" className="btn btn-primary"/>
                   </div>
               </form>
           </div>
        )
    }
}