import React from 'react';
//import Title from './Title'

class Contact extends React.Component {

render(){
  return(
    <form>
    <div class="row">
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Full Name"/>
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Email"/>
      </div>
    </div>
    <div class="form-group">
        <label for="exampleFormControlTextarea1">Write Us!</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
  </form>
)
}
}
export default Contact;
