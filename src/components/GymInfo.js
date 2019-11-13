import React from 'react';
import Title from './Title'
//import './GymInfo.css';


class GymInfo extends React.Component {

render(){
  return(

    <div className="info">
      <br>
      </br>
      <br>
      </br>
      <Title center title={'Balance Gym Info'}/>
        <br>
        </br>
      <p className="Parrafo"> "Balance Seniors helps to you to maintain a healthy lifestyle.
                              Training sessions are designed to improve cognitive function
                              and movement commonly affected by the ageing process.
                              Balance Senior programme is designed for women 60+ and adapts
                              to different physical conditions".
                            </p>

      <img className="gymInfo" src="/exercise.jpg"/>
    </div>
  )
}

}




export default GymInfo;
