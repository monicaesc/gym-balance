import React from 'react';
import Title from './Title'
import Api from '../core/Api';
import toastr from 'toastr';

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: props.currentUser,
      user: {email: "monica.escudero21@gmail.com", password: "abcdefg"},
      errorsMessage: {},
      alertVisible: false,
      errMsg: "",
      inProgress: false
    }

    console.log("Login constructor")
    console.log(props)

    this.onLoginClick = this.onLoginClick.bind(this);
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

    onLoginClick() {
        let userData = Object.assign({}, this.state.user);
        console.log("on click");
        console.log(userData);
        let cb = this.props.onLogin;
        return Api.post(`http://localhost:3000/auth/login`, userData)
            .then(apiResponse => {
              console.log("Auth Login Response:");
              console.log(apiResponse.data);
              console.log("aa: " + cb);
              console.log("user: " + apiResponse.data.user);
              this.setState({
                inProgress: false,
                token: apiResponse.token,
                currentUser: apiResponse.user});
                cb(apiResponse.data.user, apiResponse.data.token);
              //this.props.history.push('/my-schedule');
              return apiResponse.data;
        }).catch(error => {
            console.log("onLoginClick: ["+error+"]")
            this.setState({inProgress: false});
            toastr.error(error);
        });
    }

render(){
  return(
    <div>
      <Title title={'Login'}/>
      <div>
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
        <button onClick={this.onLoginClick} class="btn btn-primary">Submit</button>
      </div>
    </div>
    )
}
}
export default Login;
