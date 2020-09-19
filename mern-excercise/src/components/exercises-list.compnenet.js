import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalComponent from './modal-component'
import { Button } from 'react-bootstrap'

const Exercise = props => {
    const remove = (id) => {
        props.removeExercise(id);
    }
     return (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td style={{display:"flex"}}>
            <Link to={"/edit/" + props.exercise._id}>
                <Button variant="success">Edit</Button>
            </Link>
            <ModalComponent remove={remove} _id={props.exercise._id}/>
        </td>
    </tr>
     );
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.removeExercise = this.removeExercise.bind(this);
    
        this.state = {
            exercises: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
        .then(res => {
            this.setState({ exercises: res.data })
        })
    }
    
    removeExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
        .then( res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercises.map((exercise) => {
            return <Exercise exercise={exercise} removeExercise={this.removeExercise} key={exercise._id}/>
        })
    }

    render() {
        return(
           <div>
              <h1>Logged Exercises</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
           </div>
        )
    }
}