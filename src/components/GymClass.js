import React from 'react'
import PropTypes from 'prop-types'

function GymClass(props) {
    const gymClass = props.gymClass;
    return <div className="figure">
              <img className="gymClass" src={gymClass.imageLink} alt={gymClass.description} />
              <figcaption><p>{gymClass.description}</p></figcaption>
              <button onClick={() => {props.onRegisterGymClass(gymClass)}}>Register</button>
          </div>
}

GymClass.propTypes = {
  gymClass: PropTypes.object.isRequired,
  onRegisterGymClass: PropTypes.func.isRequired
}

export default GymClass
