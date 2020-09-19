import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercises extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if(response.data.length) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
            }
        })
        .catch((err)=> {
            console.log(err);
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChange(e) {
        this.setState({
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
        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(() => console.log('Exercise created!'))
        .catch(err => console.error(err));
        
        // window.location ='/';
    }
    
    render() {
        return(
           <div>
               <h3>Create New Exercise Log</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username:</label>
                       <select 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChange}
                            name="username"
                            >
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
                            onChange={this.onChangeDate}
                            name="date"
                        />
                       </div>
                   </div>

                   <div className="form-group">
                       <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                   </div>
               </form>
           </div>
        )
    }
}