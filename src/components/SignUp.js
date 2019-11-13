import React from 'react';
import Title from './Title'
import Api from '../core/Api';
import toastr from 'toastr';

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: props.currentUser,
      user: {name: "", email: "", password: "", password_confirmation: ""},
      errorsMessage: {},
      alertVisible: false,
      errMsg: "",
      inProgress: false
    }

    console.log("Signup constructor")
    console.log(props)

    this.onSignUpClick = this.onSignUpClick.bind(this);
    this.formUserChangeHandler = this.formUserChangeHandler.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      //Check if the Props for Services have in fact changed.
      if (this.props.currentUser !== nextProps.currentUser) {
          if (!this.state.inProgress) {
              this.props.history.push('/my-schedule');
          }
      }
  }

  //When Input is entered in the form, update the form state
  formUserChangeHandler(event) {
      let field = event.target.name,
          user = this.state.user,
          errors = this.state.errorsMessage;

      user[field] = event.target.value;
      errors[field] = "";

      return this.setState({user: user, errorsMessage: errors});
  }

  handleKeyPress(event) {
      if (event.key === 'Enter') {
          this.onLoginClick();
      }
  }

  onSignUpClick() {

      let userData = Object.assign({}, this.state.user);

      //Log the user in
      this.setState({inProgress: true});

      let cb = this.props.onLogin;
      return Api.post(`http://localhost:3000/users`, userData)
          .then(apiResponse => {
            console.log(apiResponse.data);
            this.setState({
              inProgress: false,
              token: apiResponse.token,
              currentUser: apiResponse.user});
              cb(apiResponse.data.user, apiResponse.data.token);
            //this.props.history.push('/my-schedule');
            return apiResponse.data;
      }).catch(error => {
          console.log("onSignUpClick: ["+error+"]")
          this.setState({inProgress: false});
          toastr.error(error);
      });

  }

render(){

  return(
    <div>
      <Title title={'Sign up'}/>
      <div>
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.formUserChangeHandler}
              onKeyPress={this.handleKeyPress}
              value={this.state.user.name}
              placeholder="Enter name"/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
              className="form-control"
              type="text"
              name="email"
              onChange={this.formUserChangeHandler}
              onKeyPress={this.handleKeyPress}
              value={this.state.user.email}
              placeholder="Enter email"/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.formUserChangeHandler}
              onKeyPress={this.handleKeyPress}
              value={this.state.user.password}
              placeholder="Password"/>
        </div>
        <div class="form-group">
          <label for="exampleInputConfirmPassword1">Confirm Password</label>
          <input
              className="form-control"
              type="password"
              name="password_confirmation"
              onChange={this.formUserChangeHandler}
              onKeyPress={this.handleKeyPress}
              value={this.state.user.password_confirmation}
              placeholder="Confirm Password"/>
        </div>
        <button onClick={this.onSignUpClick} class="btn btn-primary">Submit</button>
      </div>
    </div>
    )
}
}
export default SignUp;
