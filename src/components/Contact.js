import React from 'react';
import Title from './Title'


class Contact extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        isSent: false
      }
      this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    onSubmitClick() {
      console.log("on submit click");

      this.setState({isSent: true})
    }

form(){
  return(
    <div>
      <Title title={'Contact Us'}/>
      <div>
        <div class="form-group">
          <label for="exampleInputName">Full Name</label>
          <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Full Name"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Write Us!</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <button onClick={this.onSubmitClick} class="btn btn-primary">Submit</button>
      </div>
    </div>
  )
}

formSent(){
  return (
  <div>
    <Title title={'Thank you'}/>
    <div>
    We will be in touch soon
    </div>
  </div>)
}

render(){
  let view = <div/>;
  if (this.state.isSent) {
    view = this.formSent();
  } else {
    view = this.form();
  }
  return(<div>{view}</div>)
}
}
export default Contact;
