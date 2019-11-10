import React, {Component} from 'react'
import Title from './Title'
import ClassSchedule from './ClassSchedule'
import GymInfo from './GymInfo'
import Contact from './Contact'
import {  Route, Link } from "react-router-dom";

class Balance extends Component {

  constructor() {
    super()
    this.state = {
      gymClasses: [],
      screen: 'class-schedule'
    }

    this.registerGymClass = this.registerGymClass.bind(this);
  }

  componentDidMount() {
    this.fetchDataFromDB();
    // this.setState({
    //   gymClasses: data
    // });
    console.log("componentDidMount");
  }


  registerGymClass(gymClass) {
    console.log("register class")
    console.log(gymClass.description);
  }

  render() {
    return (<div>
        		<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
              <Link className="navbar-brand" to="/">Balance Seniors</Link>
      		    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      		     	<span className="navbar-toggler-icon"></span>
      		    </button>
      		    <div className="collapse navbar-collapse" id="navbarCollapse">
      			    <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/info">Gym Info</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/schedule">Class Schedule</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/contact">Contact</Link>
                  </li>
    			      </ul>
                <div>
                  <Route exact path="/schedule" render={() => (
                      <div>
                        <Title title={'Balance Gym - Schedule'}/>
                        <ClassSchedule gymClasses={this.state.gymClasses} onRegisterGymClass={this.registerGymClass}/>
                      </div>
                  )} />

                  <Route exact path="/info" component ={GymInfo} />
                  <Route exact path="/contact" component ={Contact} />
                </div>
      		    </div>

      		</nav>
</div>
    )
  }


  fetchDataFromDB(){
    console.log("fetchDataFromDB start ...");
    fetch('http://localhost:3000/status')
    .then(response => response.json())
    .then(data => {
      console.log("fetchDataFromDB done --> ["+data.klasses.length+"]");
      this.setState({ gymClasses: data.klasses});
    });

  }
}

// function fetchDataFromDB() {
// return [{
//       id: "0",
//       description: "Yoga - 11:00 am - 12:30 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/rwedgmkc0dmcv4qmkhta.jpg "
//     }, {
//       id: "1",
//       description: "Pilates - 1:00 pm - 2:00 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/umfjd8z992pi6uteoqyl.jpg "
//     }, {
//       id: "2",
//       description: "Cardio - 2:00 pm - 3:00 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/ckolqfptb6uw7emjc2le.png "
//     }, {
//       id: "3",
//       description: "Base Camp Fitness - 4:00 pm - 5:00 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/gzuq4qvuc1ptmsbnhpmx.jpg "
//     }, {
//       id: "4",
//       description: "KickBoxing - 6:00 pm - 7:00 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/xhqbbcs4qs4kxpuqfjos.jpg "
//     }, {
//       id: "5",
//       description: "Crossfit - 7:00 pm - 8:00 pm",
//       imageLink: "https://res.cloudinary.com/fittco/image/upload/w_720,f_auto/ttnfrz2ic7xxjawwyszp.jpg "
//     }]
// }


export default Balance;
