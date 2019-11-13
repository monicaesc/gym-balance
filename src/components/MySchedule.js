import React, {Component} from 'react'
import Title from './Title'
import MyGymClass from './MyGymClass'
import PropTypes from 'prop-types'

class MySchedule extends Component {

  constructor(props) {
    super(props)
//    this.state = {
//      currentUser: props.currentUser,
//      user: {email: "monica.escudero21@gmail.com", password: "abc"},
//      errorsMessage: {},
//      alertVisible: false,
//      errMsg: "",
//      inProgress: false
//    }

    console.log("MySchedule constructor")
    console.log(props)
  }

  render() {

    let isEnrolled = this.props.gymClasses.length > 0;
    console.log("--> ["+isEnrolled+"] ["+this.props.gymClasses.length+"]");

    return (<div>
              <Title title={'My Schedule'}/>
              <div className="classGrid">
              {isEnrolled &&
                <div className="classGrid">
                  {this.props.gymClasses.map((gymClass, index) => <MyGymClass key={index} gymClass={gymClass} onUnregisterGymClass={this.props.onUnregisterGymClass} /> )}
                </div>
              }
              {!isEnrolled &&
                <div className="classGrid">
                  <h3>Not enrolled in any class.</h3>
                </div>
              }

              </div>
          </div>)
  }
}

MySchedule.propTypes = {
    gymClasses: PropTypes.array.isRequired,
    onRegisterGymClass: PropTypes.func.isRequired
}


export default MySchedule
