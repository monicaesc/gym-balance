import React from 'react';
import Title from './Title';
import './HomePage.css';

class HomePage extends React.Component {

  render(){
    return(
      <div className="HomePage">
        <Title title={'Welcome to Balance Gym'}/>
        <div className="figure">
          <img className="gymInfo1" src="https://static01.nyt.com/images/2019/09/23/business/23ageism1/23ageism1-superJumbo.jpg?quality=90&auto=webp" alt="gugu" />
        </div>
      </div>
    )
  }
}


export default HomePage;
