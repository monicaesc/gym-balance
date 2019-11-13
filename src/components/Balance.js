import React, {Component} from 'react'
import NavBar from './NavBar'
import HomePage from './HomePage'
import ClassSchedule from './ClassSchedule'
import Login from './Login'
import SignUp from './SignUp'
import MySchedule from './MySchedule'
import GymInfo from './GymInfo'
import Contact from './Contact'
import GeneralUtils from '../core/GeneralUtils';
import Api from '../core/Api';
import {  Route, withRouter } from "react-router-dom";

class Balance extends Component {

  constructor() {
    super()
    this.state = {
      gymClasses: [],
      myClasses: [],
      screen: 'class-schedule'
    }

    this.registerGymClass = this.registerGymClass.bind(this);
    this.unregisterGymClass = this.unregisterGymClass.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.fetchDataFromDB();
  }


  registerGymClass(gymClass) {
    console.log("register class")
    console.log(gymClass.id);
    console.log(gymClass.description);

    let enrollData = {
      klass_id: gymClass.id,
      user_id: this.state.currentUser.id
    }
    console.log(enrollData);
    return Api.post(`http://localhost:3000/klass_enroll`, enrollData)
        .then(apiResponse => {
          console.log("Enroll Klass Response:");
          console.log(apiResponse.data);

          this.fetchDataFromDB();
          this.fetchMyKlassesFromDB();

    }).catch(error => {
        console.log("enroll klass: ["+error+"]")
    });
  }

  unregisterGymClass(gymClass) {
    console.log("unregister class")
    console.log(gymClass.id);
    console.log(gymClass.description);

    let enrollData = {
      klass_id: gymClass.id,
      user_id: this.state.currentUser.id
    }
    console.log(enrollData);
    var config = {
     headers: {'Authorization': this.state.token}
    };
    return Api.post(`http://localhost:3000/klass_unenroll`, enrollData, config)
        .then(apiResponse => {
          console.log("Unenroll Klass Response:");
          console.log(apiResponse.data);

          this.fetchDataFromDB();
          this.fetchMyKlassesFromDB();

    }).catch(error => {
        console.log("enroll klass: ["+error+"]")
    });

  }


  onLogin(currentUser, token) {
    console.log("Balance - onLogin");
    console.log(currentUser);
    console.log(token)
    this.setState({currentUser: currentUser, token: token});
    this.props.history.push('/my-schedule');
    console.log("Balance - onLogin done");
    this.fetchMyKlassesFromDB();
  }

  //Contruir las paginas o routes de un usuario que NO ESTA AUTENTICADO
  buildAnonymousUserRoutes() {

      return (
        <div>
          <Route exact path="/info" component ={GymInfo} />
          <Route exact path="/sign-up" render={() => (
              <SignUp  onLogin={this.onLogin}/>
          )} />
          <Route exact path="/login" render={() => (
              <Login  onLogin={this.onLogin}/>
          )} />
        </div>
      );
  }

  //Contruir las paginas o routes de un usuario que ESTA AUTENTICADO
  buildLoggedInRoutes() {

      return (
        <div>
          <Route exact path="/schedule" render={() => (
              <ClassSchedule gymClasses={this.state.gymClasses} myClasses={this.state.myClasses} onRegisterGymClass={this.registerGymClass} onUnregisterGymClass={this.unregisterGymClass}/>
          )} />
          <Route exact path="/my-schedule" render={() => (
              <MySchedule gymClasses={this.state.myClasses} onRegisterGymClass={this.registerGymClass} onUnregisterGymClass={this.unregisterGymClass}/>
          )} />
          <Route exact path="/contact" component ={Contact} />
        <Route exact path="/gym-info" component ={GymInfo} />
        </div>
      );
  }


  render() {

    console.log("Balance - render: " + this.state.currentUser);
    console.log(this.state.currentUser);

    let routes = <div/>;
    let isUserLoggedIn = GeneralUtils.isUserLoggedIn(this.state.currentUser);
    if (isUserLoggedIn) {
      console.log("buildLoggedInRoutes");
      routes = this.buildLoggedInRoutes();
    } else {
      console.log("buildAnonymousUserRoutes");
      routes = this.buildAnonymousUserRoutes();
    }


    return (<div className="container">
          <NavBar currentUser={this.state.currentUser}/>
          <div>
            <Route exact path="/" component ={HomePage} />
            {routes}
          </div>
      </div>
    )
  }


  fetchDataFromDB(){
    console.log("fetchDataFromDB start ...");
    fetch('http://localhost:3000/klasses')
    .then(response => response.json())
    .then(data => {
      console.log("fetchDataFromDB done --> ["+data.klasses.length+"]");
      this.setState({ gymClasses: data.klasses});
    });

  }

  fetchMyKlassesFromDB(){
    console.log("fetchMyKlassesFromDB start ...");
    let isUserLoggedIn = GeneralUtils.isUserLoggedIn(this.state.currentUser);
    if (isUserLoggedIn) {
      fetch('http://localhost:3000/findmyklasses/'+this.state.currentUser.id)
      .then(response => response.json())
      .then(data => {
        console.log("fetchMyKlassesFromDB done --> ["+data.my_klasses.length+"]");
        console.log(data)
        this.setState({ myClasses: data.my_klasses});
      });
    }
  }
}


export default withRouter(Balance);
