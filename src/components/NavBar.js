import React, {Component} from 'react'
import { Link } from "react-router-dom";
import GeneralUtils from '../core/GeneralUtils';

class NavBar extends Component {

  constructor(props) {
      super(props);

      this.state = {
          currentUser: props.currentUser,
          currentActiveLink: ''
      };

      console.log("NavBar Constructor")
  }

  componentDidMount() {
    console.log("NavBar componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Nav Bar componentDidUpdate");
    console.log(prevState.currentUser);
    console.log(this.state);
  }

  //Called any time the Props have Changed in the Redux Store
  UNSAFE_componentWillReceiveProps(nextProps) {
      //Check if the Props for Services have in fact changed.
      if (this.props.currentUser !== nextProps.currentUser) {
          this.setState({
              currentUser: nextProps.currentUser,
              hover: false
          });
      }
  }

  buildAnonymousUserNavItems() {

      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/sign-up">Signup</Link>
          </li>
        </ul>
      );
  }

  buildLoggedInNavItems() {

      return (
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/gym-info">Gym Info</Link>
        </li>
          <li className="nav-item">
            <Link className="nav-link" to="/schedule">Class Schedule</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-schedule">My Schedule</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={this.onLogOutClick}>Log Out</Link>
          </li>

        </ul>
      );
  }

  onLogOutClick(event) {
      event.preventDefault();
      //Va al servidor de Ruby y cerra la session.
       window.location.href = 'http://localhost:3001';
  }

  render() {
    let navItems = <div/>;
    let isUserLoggedIn = GeneralUtils.isUserLoggedIn(this.props.currentUser);
    if (isUserLoggedIn) {
      navItems = this.buildLoggedInNavItems();
    } else {
      navItems = this.buildAnonymousUserNavItems();
    }
    console.log("NavBar - render isUserLoggedIn: ["+isUserLoggedIn+"]");

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Balance Seniors</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className2="collapse navbar-collapse" id="navbarSupportedContent">
          {navItems}
        </div>
      </nav>

    )
  }
}

export default NavBar
