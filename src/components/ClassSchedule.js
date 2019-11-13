import React, {Component} from 'react'
import Title from './Title'
import GymClass from './GymClass'
import PropTypes from 'prop-types'

class ClassSchedule extends Component {
  render() {
    return <div>
      <br>
      </br>
              <Title title={'Class Schedule'}/>
                <br>
                </br>
              <div className="classGrid">
                {this.props.gymClasses.map((gymClass, index) => <GymClass key={index} gymClass={gymClass} onRegisterGymClass={this.props.onRegisterGymClass} /> )}
              </div>
          </div>
  }
}

ClassSchedule.propTypes = {
    gymClasses: PropTypes.array.isRequired,
    onRegisterGymClass: PropTypes.func.isRequired
}


export default ClassSchedule
