import React, { Component } from 'react';
import Dashboard from './dashboard';
import Login from './login';
import Register from './register';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isRegistered : true,
      isLoggedin : false
    }
  }
  register = (resp)=>{
    this.setState({isRegistered:resp});
  }
  login =(resp)=>{
    localStorage.setItem("isLoggedin", resp);
    this.setState({isLoggedin:resp});
  }
  render(){
    var isRegisterd = this.state.isRegistered;
    var form = (isRegisterd?<Login goToRegisterPage= {this.register} loginState={this.login}/>:<Register getRegister={this.register}/>);
    return (
            ((localStorage.getItem("isLoggedin")==='true')?<Dashboard loginState={this.login}/>:form)
            );
  }
}

export default App;
