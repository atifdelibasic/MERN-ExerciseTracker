import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
        .then( (response) => {
            this.setState({
                username:response.data.username,
                description: response.data.description,
                duration: Number(response.data.duration),
                date: new Date(response.data.date)
            })
        });

        axios.get('http://localhost:5000/exercises')
        .then((response) => {
            console.log(response.data);
            if(response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username)
                })
            }
        })
    }

    onChange(e) {
        this.setState( {
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
        .then((res) => { console.log('Uspjesno!') })
        
        window.location ='/';
    }

    
    render() {
        return(
           <div>
               <h3>Edit Exercise Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username:</label>
                       <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChange}
                            name="username">
                            {
                                this.state.users.map((user) => {
                                    return <option key={user}
                                                    value={user}>
                                        {user}
                                        </option>
                                })
                            }
                        </select>
                   </div>
                   <div className="form-group">
                       <label>Description:</label>
                       <input type="text"
                           required
                           className="form-control"
                           value={this.state.description}
                           onChange={this.onChange}
                           name="description"
                       />
                   </div>
                   <div className="form-group">
                       <label>Duration:</label>
                       <input type="text"
                           className="form-control"
                           value={this.state.duration}
                           onChange={this.onChange}
                           name="duration"
                       />
                   </div>
                   <div className="form-group">
                       <label>Date:</label>
                       <div>
                       <DatePicker
                            selected={this.state.date}
                            onChange={this.onChange}
                            name="date"
                        />
                       </div>
                   </div>

                   <div className="form-group">
                       <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                   </div>
               </form>
           </div>
        )
    }
}