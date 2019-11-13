import React from 'react'
import PropTypes from 'prop-types'

function MyGymClass(props) {
    const gymClass = props.gymClass;
    return <div className="figure">
              <img className="gymClass" src={gymClass.image_url} alt={gymClass.description} />
              <figcaption><p>{gymClass.description}</p></figcaption>
              <button onClick={() => {props.onUnregisterGymClass(gymClass)}}>Unregister</button>
          </div>
}


export default MyGymClass
