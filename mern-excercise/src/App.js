import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, CreateExercise, CreateUser, ExercisesList, EditExercise, UsersList, EditUser } from './components'

const App = () => {
  return (
    <div className="">
      <Router>
        <Navbar />
        <br/>
        <div className="container">
          <Route path="/" exact component={ExercisesList}/>
          <Route path="/create" exact component={CreateExercise}/>
          <Route path="/user" exact component={CreateUser}/>
          <Route path="/edit/:id" component={EditExercise}/>
          <Route path="/users" component={UsersList}/>
          <Route path="/user/edit/:id" component={EditUser}/>
        </div>
      </Router>
    </div>
  )
}

export default App;
